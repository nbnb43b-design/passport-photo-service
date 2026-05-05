import React, { useState } from 'react';

export default function Size({ photoData, onSelect, onBack }) {
  const [photoSize, setPhotoSize] = useState('passport');
  const [copies, setCopies] = useState(6);

  const sizes = [
    { id: 'passport', label: '📕 Passport', dimensions: '35mm × 45mm' },
    { id: '2x2', label: '📦 2×2 inch', dimensions: '50mm × 50mm' },
    { id: '4x6', label: '📄 4×6 inch', dimensions: '101mm × 152mm' },
    { id: 'custom', label: '✏️ Custom', dimensions: 'Custom size' }
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-2">📏 Select Photo Size</h2>
      <p className="text-gray-600 mb-8">Choose the size and quantity for your photos</p>

      {/* Size Selection */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {sizes.map((size) => (
          <button
            key={size.id}
            onClick={() => setPhotoSize(size.id)}
            className={`p-4 rounded-lg border-2 transition-all ${
              photoSize === size.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <div className="font-semibold text-gray-800">{size.label}</div>
            <div className="text-sm text-gray-600">{size.dimensions}</div>
          </button>
        ))}
      </div>

      {/* Copies Selection */}
      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <label className="block text-sm font-semibold text-gray-700 mb-4">
          Number of Copies: <span className="text-blue-600 text-lg">{copies}</span>
        </label>
        <input
          type="range"
          min="1"
          max="20"
          value={copies}
          onChange={(e) => setCopies(parseInt(e.target.value))}
          className="slider"
        />
        <div className="flex justify-between text-sm text-gray-600 mt-2">
          <span>1</span>
          <span>20</span>
        </div>
      </div>

      {/* Preview Info */}
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-8">
        <p className="text-sm text-purple-800">
          <strong>Preview:</strong> {copies} × {photoSize.toUpperCase()} photos will be arranged on an A4 page for printing
        </p>
      </div>

      <div className="flex gap-4">
        <button onClick={onBack} className="button-secondary flex-1">
          ← Back
        </button>
        <button
          onClick={() => onSelect(photoSize, copies)}
          className="button-primary flex-1"
        >
          Continue →
        </button>
      </div>
    </div>
  );
}
