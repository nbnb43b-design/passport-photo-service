import React, { useState } from 'react';
import axios from 'axios';

export default function Edit({ photoData, onEdit, onBack }) {
  const [preview, setPreview] = useState(photoData.current);
  const [loading, setLoading] = useState(false);
  const [rotate, setRotate] = useState(0);
  const [brightness, setBrightness] = useState(0);
  const [contrast, setContrast] = useState(0);
  const [bgRemoved, setBgRemoved] = useState(false);

  const applyEdits = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/api/photos/edit', {
        imagePath: photoData.current,
        rotate: rotate !== 0 ? rotate : undefined,
        brightness: brightness !== 0 ? brightness : undefined,
        contrast: contrast !== 0 ? contrast : undefined
      });

      if (response.data.success) {
        setPreview(response.data.imagePath);
        onEdit({
          current: response.data.imagePath,
          edited: true
        });
      }
    } catch (error) {
      alert('Edit failed: ' + error.message);
      setLoading(false);
    }
  };

  const removeBackground = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/api/photos/remove-bg', {
        imageUrl: preview,
        bgColor: 'white'
      });

      if (response.data.success) {
        setPreview(response.data.imagePath);
        setBgRemoved(true);
      }
    } catch (error) {
      alert('Background removal failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-8">✂️ Edit Your Photo</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Preview */}
        <div className="flex flex-col items-center">
          <img src={preview} alt="Edit preview" className="image-preview mb-4" />
          <button
            onClick={removeBackground}
            disabled={loading || bgRemoved}
            className="button-primary mb-4"
          >
            {bgRemoved ? '✓ Background Removed' : '🎨 Remove Background'}
          </button>
        </div>

        {/* Controls */}
        <div className="space-y-6">
          {/* Rotate */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Rotate: {rotate}°
            </label>
            <input
              type="range"
              min="-180"
              max="180"
              value={rotate}
              onChange={(e) => setRotate(parseInt(e.target.value))}
              className="slider"
            />
          </div>

          {/* Brightness */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Brightness: {brightness}%
            </label>
            <input
              type="range"
              min="-50"
              max="50"
              value={brightness}
              onChange={(e) => setBrightness(parseInt(e.target.value))}
              className="slider"
            />
          </div>

          {/* Contrast */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Contrast: {contrast}%
            </label>
            <input
              type="range"
              min="-50"
              max="50"
              value={contrast}
              onChange={(e) => setContrast(parseInt(e.target.value))}
              className="slider"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <button onClick={onBack} className="button-secondary flex-1">
              ← Back
            </button>
            <button
              onClick={applyEdits}
              disabled={loading}
              className="button-primary flex-1"
            >
              {loading ? 'Processing...' : 'Apply Edits →'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
