import React, { useState } from 'react';
import axios from 'axios';

export default function Print({ photoData, onBack }) {
  const [loading, setLoading] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [error, setError] = useState('');

  const generatePDF = async () => {
    setLoading(true);
    setError('');

    try {
      // First, arrange photos
      const arrangeResponse = await axios.post('/api/print/arrange', {
        imagePath: photoData.current,
        photoSize: photoData.photoSize,
        copies: photoData.copies
      });

      if (!arrangeResponse.data.success) {
        throw new Error('Failed to arrange photos');
      }

      // Then generate PDF
      const pdfResponse = await axios.post('/api/print/generate-pdf', {
        arrangement: arrangeResponse.data.arrangement
      });

      if (pdfResponse.data.success) {
        setPdfUrl(pdfResponse.data.pdfPath);
      }
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'passport-photos.pdf';
    link.click();
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-8">🖨️ Print Preview & Download</h2>

      {pdfUrl ? (
        <div className="space-y-6">
          <div className="bg-gray-100 rounded-lg p-6 text-center">
            <div className="text-6xl mb-4">📄</div>
            <p className="text-gray-700 font-semibold mb-4">PDF Ready!</p>
            <p className="text-gray-600 mb-6">
              Your {photoData.copies} × {photoData.photoSize} photos are ready for printing
            </p>
            <button
              onClick={downloadPDF}
              className="button-primary inline-block"
            >
              ⬇️ Download PDF
            </button>
          </div>

          {/* Print Info */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{photoData.copies}</div>
              <div className="text-sm text-gray-600">Copies</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{photoData.photoSize}</div>
              <div className="text-sm text-gray-600">Size</div>
            </div>
            <div className="bg-pink-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-pink-600">A4</div>
              <div className="text-sm text-gray-600">Paper Size</div>
            </div>
          </div>

          {/* Print Tips */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-green-900 mb-2">🖨️ Print Tips:</h3>
            <ul className="text-sm text-green-800 space-y-1">
              <li>✓ Use 6×4 inch photo paper (glossy recommended)</li>
              <li>✓ Set printer to maximum quality</li>
              <li>✓ Disable scaling/fit-to-page option</li>
              <li>✓ Use color profile for best results</li>
            </ul>
          </div>

          <button
            onClick={onBack}
            className="button-secondary w-full"
          >
            ← Start Over
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-dashed border-blue-300 rounded-lg p-12 text-center">
            <div className="text-6xl mb-4">📋</div>
            <p className="text-gray-700 font-semibold mb-4">Generate Your Print-Ready PDF</p>
            <p className="text-gray-600 mb-8">
              Your photos will be automatically arranged on an A4 page at 300 DPI
            </p>
            <button
              onClick={generatePDF}
              disabled={loading}
              className="button-primary"
            >
              {loading ? (
                <>
                  <span className="inline-block animate-spin mr-2">⚙️</span>
                  Generating PDF...
                </>
              ) : (
                '✨ Generate PDF'
              )}
            </button>
          </div>

          {error && (
            <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              Error: {error}
            </div>
          )}

          <div className="flex gap-4">
            <button
              onClick={onBack}
              className="button-secondary flex-1"
            >
              ← Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
