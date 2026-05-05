import React, { useRef, useState } from 'react';
import axios from 'axios';

export default function Upload({ onUpload }) {
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Show preview
    const reader = new FileReader();
    reader.onload = (event) => {
      setPreview(event.target.result);
    };
    reader.readAsDataURL(file);

    // Upload
    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('photo', file);

    try {
      const response = await axios.post('/api/photos/upload', formData);

      if (response.data.success) {
        onUpload({
          original: response.data.filePath,
          current: response.data.filePath,
          metadata: response.data.metadata
        });
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Upload failed');
      setLoading(false);
    }
  };

  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">📱 Upload Your Photo</h2>

      {!preview ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-4 border-dashed border-blue-400 rounded-xl p-12 cursor-pointer hover:bg-blue-50 transition-all"
        >
          <div className="text-6xl mb-4">📷</div>
          <p className="text-xl font-semibold text-gray-700 mb-2">Click to upload or drag and drop</p>
          <p className="text-gray-500">JPG, PNG, or WebP (up to 50MB)</p>
        </div>
      ) : (
        <div>
          <img src={preview} alt="Preview" className="image-preview mx-auto mb-6" />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="button-secondary mb-4"
            disabled={loading}
          >
            Choose Different Photo
          </button>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        disabled={loading}
      />

      {error && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {loading && (
        <div className="mt-4">
          <div className="inline-block">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
          <p className="text-gray-600 mt-2">Uploading...</p>
        </div>
      )}
    </div>
  );
}
