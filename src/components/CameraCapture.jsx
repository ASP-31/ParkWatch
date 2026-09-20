import React, { useRef, useState, useCallback } from 'react';

const CameraCapture = ({ onCapture }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState(null);

  const startCamera = async () => {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' }, 
        audio: false 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsStreaming(true);
      }
    } catch (err) {
      setError('Camera access denied or not available.');
      console.error(err);
    }
  };

  const capturePhoto = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    const dataUrl = canvas.toDataURL('image/jpeg');
    onCapture(dataUrl);
    
    // Stop stream after capture to save battery
    const stream = video.srcObject;
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setIsStreaming(false);
    }
  }, [onCapture]);

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-md mx-auto">
      {!isStreaming ? (
        <button 
          onClick={startCamera}
          className="bg-blue-600 text-white px-6 py-3 rounded-full font-bold shadow-lg active:scale-95 transition-transform"
        >
          Open Camera
        </button>
      ) : (
        <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden shadow-xl">
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            className="w-full h-full object-cover"
          />
          <button 
            onClick={capturePhoto}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white text-black w-16 h-16 rounded-full border-4 border-gray-300 shadow-2xl active:scale-90 transition-transform"
          />
        </div>
      )}
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default CameraCapture;
