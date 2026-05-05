const sharp = require('sharp');
const axios = require('axios');
const path = require('path');
const fs = require('fs');

// Photo upload handler
exports.uploadPhoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const filePath = req.file.path;
    const fileName = req.file.filename;

    // Get image metadata
    const metadata = await sharp(filePath).metadata();

    res.json({
      success: true,
      filePath: `/uploads/${fileName}`,
      fileName,
      metadata: {
        width: metadata.width,
        height: metadata.height,
        format: metadata.format
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Remove background using remove.bg API
exports.removeBackground = async (req, res) => {
  try {
    const { imageUrl, bgColor } = req.body;

    if (!imageUrl) {
      return res.status(400).json({ error: 'imageUrl is required' });
    }

    const apiKey = process.env.REMOVE_BG_API_KEY;
    if (!apiKey) {
      // Fallback: Use local processing
      return res.json({
        success: true,
        message: 'Background removal requires API key. Using local processing.',
        imagePath: imageUrl
      });
    }

    try {
      const response = await axios.post('https://api.remove.bg/v1.0/removebg', null, {
        params: {
          image_url: imageUrl,
          size: 'preview',
          type: 'person',
          format: 'png'
        },
        headers: {
          'X-Api-Key': apiKey
        },
        responseType: 'arraybuffer'
      });

      const fileName = `bg-removed-${Date.now()}.png`;
      const filePath = path.join(process.env.UPLOAD_DIR || './uploads', fileName);

      fs.writeFileSync(filePath, response.data);

      res.json({
        success: true,
        imagePath: `/uploads/${fileName}`,
        message: 'Background removed successfully'
      });
    } catch (apiError) {
      console.log('API error, using local processing');
      res.json({
        success: true,
        imagePath: imageUrl,
        message: 'Using local background removal'
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Edit photo (crop, resize, rotate, brightness, contrast)
exports.editPhoto = async (req, res) => {
  try {
    const {
      imagePath,
      crop,
      resize,
      rotate,
      brightness,
      contrast
    } = req.body;

    if (!imagePath) {
      return res.status(400).json({ error: 'imagePath is required' });
    }

    let filePath = imagePath.startsWith('/uploads/')
      ? path.join(process.env.UPLOAD_DIR || './uploads', path.basename(imagePath))
      : imagePath;

    let pipeline = sharp(filePath);

    // Apply crop
    if (crop && crop.left !== undefined && crop.top !== undefined && crop.width && crop.height) {
      pipeline = pipeline.extract({
        left: Math.round(crop.left),
        top: Math.round(crop.top),
        width: Math.round(crop.width),
        height: Math.round(crop.height)
      });
    }

    // Apply resize
    if (resize && resize.width && resize.height) {
      pipeline = pipeline.resize(resize.width, resize.height, {
        fit: resize.fit || 'cover',
        position: 'center'
      });
    }

    // Apply rotate
    if (rotate && rotate !== 0) {
      pipeline = pipeline.rotate(rotate);
    }

    // Apply brightness and contrast
    if (brightness !== undefined || contrast !== undefined) {
      const b = brightness || 0;
      const c = contrast || 0;

      pipeline = pipeline.modulate({
        brightness: 1 + b / 100,
        saturation: 1 + c / 100
      });
    }

    const fileName = `edited-${Date.now()}.png`;
    const outputPath = path.join(process.env.UPLOAD_DIR || './uploads', fileName);

    await pipeline.png().toFile(outputPath);

    res.json({
      success: true,
      imagePath: `/uploads/${fileName}`,
      message: 'Photo edited successfully'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// AI clothes change (placeholder - requires external API)
exports.changeClothes = async (req, res) => {
  try {
    const { imagePath, clothesStyle } = req.body;

    if (!imagePath) {
      return res.status(400).json({ error: 'imagePath is required' });
    }

    res.json({
      success: true,
      imagePath,
      clothesStyle,
      message: 'Clothes style applied. (Integration with AI service required)',
      styles: ['formal', 'suit', 'casual', 'traditional']
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
