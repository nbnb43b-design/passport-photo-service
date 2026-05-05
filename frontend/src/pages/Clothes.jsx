import React, { useState } from 'react';
import axios from 'axios';

export default function Clothes({ photoData, onSelect, onBack }) {
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);

  const clothesOptions = [
    { id: 'formal', label: '🎩 Formal', color: 'bg-blue-600' },
    { id: 'suit', label: '👔 Suit', color: 'bg-gray-700' },
    { id: 'casual', label: '👕 Casual', color: 'bg-green-600' },
    { id: 'traditional', label: '👗 Traditional', color: 'bg-red-600' },
    { id: 'none', label: '✓ Keep Original', color: 'bg-gray-400' }
  ];

  const handleSelect = async (style) => {
    setLoading(true);
    try {
      const response = await axios.post('/api/photos/change-clothes', {
        imagePath: photoData.current,
        clothesStyle: style
      });

      if (response.data.success) {
        setSelected(style);
        onSelect(style);
      }
    } catch (error) {
      alert('Clothes change failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-2">👗 Select Dress Code</h2>
      <p className="text-gray-600 mb-8">Choose your outfit style for the photo</p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {clothesOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => handleSelect(option.id)}
            disabled={loading}
            className={`p-6 rounded-lg font-semibold text-white transition-all ${
              selected === option.id
                ? 'ring-4 ring-yellow-400 scale-105'
                : 'hover:scale-105'
            } ${option.color}`}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
        <p className="text-sm text-blue-800">
          💡 <strong>Note:</strong> AI clothes change requires integration with an external AI service.
          Currently showing style options. Selected: <strong>{selected || 'None'}</strong>
        </p>
      </div>

      <div className="flex gap-4">
        <button onClick={onBack} className="button-secondary flex-1">
          ← Back
        </button>
        <button
          onClick={() => onSelect(selected || 'none')}
          disabled={loading}
          className="button-primary flex-1"
        >
          {loading ? 'Processing...' : 'Continue →'}
        </button>
      </div>
    </div>
  );
}
