'use client';

import React, { useState } from 'react';
import CameraCapture from '@/components/CameraCapture';
import ReportForm from '@/components/ReportForm';
import ViolationFeed from '@/components/ViolationFeed';

export default function Home() {
  const [capturedImage, setCapturedImage] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleCapture = (image) => {
    setCapturedImage(image);
    setIsSubmitted(false);
  };

  const handleSubmitted = () => {
    setIsSubmitted(true);
    setCapturedImage(null);
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="flex flex-col items-center gap-8">
        <div className="text-center">
          <h1 className="text-4xl font-black text-blue-700">ParkWatch</h1>
          <p className="text-gray-600">Keep our streets clear</p>
        </div>

        {!isSubmitted && !capturedImage && (
          <CameraCapture onCapture={handleCapture} />
        )}

        {!isSubmitted && capturedImage && (
          <ReportForm 
            image={capturedImage} 
            onSubmitted={handleSubmitted} 
          />
        )}

        {isSubmitted && (
          <div className="text-center animate-bounce text-green-600 font-bold">
            ✅ Report submitted successfully!
          </div>
        )}

        <div className="w-full border-t pt-8">
          <ViolationFeed />
        </div>
      </div>
    </main>
  );
}
