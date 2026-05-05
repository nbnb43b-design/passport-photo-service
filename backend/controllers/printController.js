const sharp = require('sharp');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// Photo sizes in mm and pixels (at 300 DPI)
const PHOTO_SIZES = {
  passport: { width: 35, height: 45, mmWidth: 35, mmHeight: 45 },
  '2x2': { width: 50, height: 50, mmWidth: 50, mmHeight: 50 },
  '4x6': { width: 101, height: 152, mmWidth: 101, mmHeight: 152 },
  custom: { width: 50, height: 50, mmWidth: 50, mmHeight: 50 }
};

// Convert mm to pixels (at 300 DPI)
const mmToPixels = (mm) => Math.round((mm * 300) / 25.4);

// Arrange photos on A4 page
exports.arrangePhotos = async (req, res) => {
  try {
    const { imagePath, photoSize = 'passport', copies = 6 } = req.body;

    if (!imagePath) {
      return res.status(400).json({ error: 'imagePath is required' });
    }

    const size = PHOTO_SIZES[photoSize] || PHOTO_SIZES.passport;
    const pixelWidth = mmToPixels(size.mmWidth);
    const pixelHeight = mmToPixels(size.mmHeight);

    // Resize photo to desired size
    const filePath = imagePath.startsWith('/uploads/')
      ? path.join(process.env.UPLOAD_DIR || './uploads', path.basename(imagePath))
      : imagePath;

    const resizedBuffer = await sharp(filePath)
      .resize(pixelWidth, pixelHeight, {
        fit: 'cover',
        position: 'center'
      })
      .png()
      .toBuffer();

    // Create arrangement data
    const arrangement = {
      photoSize,
      copies,
      pixelWidth,
      pixelHeight,
      photoBuffer: resizedBuffer.toString('base64'),
      sizes: PHOTO_SIZES
    };

    res.json({
      success: true,
      arrangement,
      message: `${copies} copies arranged for ${photoSize} size`
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Generate print-ready PDF
exports.generatePDF = async (req, res) => {
  try {
    const { arrangement } = req.body;

    if (!arrangement) {
      return res.status(400).json({ error: 'arrangement data is required' });
    }

    const { photoSize, copies, pixelWidth, pixelHeight, photoBuffer } = arrangement;
    const size = PHOTO_SIZES[photoSize] || PHOTO_SIZES.passport;

    // A4 dimensions in points (1 point = 1/72 inch)
    const A4_WIDTH = 595; // 210mm
    const A4_HEIGHT = 842; // 297mm

    // Convert photo size to points
    const photoPointWidth = (size.mmWidth * 72) / 25.4;
    const photoPointHeight = (size.mmHeight * 72) / 25.4;

    // Margins
    const margin = 20;
    const gap = 10;

    // Create PDF
    const doc = new PDFDocument({
      size: 'A4',
      margin: margin,
      bufferPages: true
    });

    const fileName = `passport-photos-${Date.now()}.pdf`;
    const filePath = path.join(process.env.UPLOAD_DIR || './uploads', fileName);
    const writeStream = fs.createWriteStream(filePath);

    doc.pipe(writeStream);

    // Add title
    doc.fontSize(12).text('Passport Photo Print', { align: 'center' });
    doc.moveDown();

    // Calculate grid layout
    const availableWidth = A4_WIDTH - 2 * margin;
    const availableHeight = A4_HEIGHT - 2 * margin - 30;

    const photosPerRow = Math.floor((availableWidth + gap) / (photoPointWidth + gap));
    const photosPerColumn = Math.floor((availableHeight + gap) / (photoPointHeight + gap));
    const photosPerPage = photosPerRow * photosPerColumn;

    let currentCopy = 0;
    let pageCount = 1;

    // Create buffer from base64
    const photoImageBuffer = Buffer.from(photoBuffer, 'base64');

    // Arrange photos
    let x = margin;
    let y = 50;
    let rowCount = 0;

    for (let i = 0; i < copies; i++) {
      if (currentCopy > 0 && currentCopy % photosPerPage === 0) {
        doc.addPage();
        pageCount++;
        x = margin;
        y = margin;
        rowCount = 0;
      }

      doc.image(photoImageBuffer, x, y, {
        width: photoPointWidth,
        height: photoPointHeight
      });

      x += photoPointWidth + gap;
      rowCount++;

      if (rowCount >= photosPerRow) {
        x = margin;
        y += photoPointHeight + gap;
        rowCount = 0;
      }

      currentCopy++;
    }

    // Add footer with metadata
    doc.fontSize(8).text(
      `Generated: ${new Date().toLocaleString()} | Size: ${photoSize} | Copies: ${copies}`,
      margin,
      A4_HEIGHT - margin - 10,
      { align: 'center' }
    );

    doc.end();

    writeStream.on('finish', () => {
      res.json({
        success: true,
        pdfPath: `/uploads/${fileName}`,
        fileName,
        pages: pageCount,
        message: 'PDF generated successfully'
      });
    });

    writeStream.on('error', (err) => {
      res.status(500).json({ error: 'Failed to create PDF: ' + err.message });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
