import React, { useState } from 'react';
import Upload from './pages/Upload';
import Edit from './pages/Edit';
import Clothes from './pages/Clothes';
import Size from './pages/Size';
import Print from './pages/Print';

export default function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [photoData, setPhotoData] = useState({
    original: null,
    current: null,
    edited: null,
    bgRemoved: false,
    clothesStyle: null,
    photoSize: 'passport',
    copies: 6
  });

  const steps = ['Upload', 'Edit', 'Clothes', 'Size', 'Print'];

  const goToStep = (step) => {
    if (step <= currentStep + 1) {
      setCurrentStep(step);
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updatePhotoData = (updates) => {
    setPhotoData((prev) => ({ ...prev, ...updates }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">📸 Passport Photo Studio</h1>
          <p className="text-blue-100">Create professional passport photos in minutes</p>
        </div>

        {/* Step Indicator */}
        <div className="step-indicator mb-12 px-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`step cursor-pointer ${index === currentStep ? 'active' : ''} ${
                index < currentStep ? 'completed' : ''
              }`}
              onClick={() => goToStep(index)}
            >
              <div className="step-circle">{index < currentStep ? '✓' : index + 1}</div>
              <span className="text-sm font-semibold text-white mt-2">{step}</span>
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-8">
            {currentStep === 0 && (
              <Upload
                onUpload={(data) => {
                  updatePhotoData(data);
                  nextStep();
                }}
              />
            )}

            {currentStep === 1 && (
              <Edit
                photoData={photoData}
                onEdit={(data) => {
                  updatePhotoData(data);
                  nextStep();
                }}
                onBack={prevStep}
              />
            )}

            {currentStep === 2 && (
              <Clothes
                photoData={photoData}
                onSelect={(clothesStyle) => {
                  updatePhotoData({ clothesStyle });
                  nextStep();
                }}
                onBack={prevStep}
              />
            )}

            {currentStep === 3 && (
              <Size
                photoData={photoData}
                onSelect={(photoSize, copies) => {
                  updatePhotoData({ photoSize, copies });
                  nextStep();
                }}
                onBack={prevStep}
              />
            )}

            {currentStep === 4 && (
              <Print
                photoData={photoData}
                onBack={prevStep}
              />
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-blue-100 text-sm">
          <p>Step {currentStep + 1} of {steps.length}</p>
        </div>
      </div>
    </div>
  );
}
