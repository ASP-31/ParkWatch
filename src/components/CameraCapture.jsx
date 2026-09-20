import React, { useCallback, useEffect, useRef, useState } from 'react';

const CameraIcon = ({ className = 'h-8 w-8' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M14.5 4h-5L7.6 6.5H5a2 2 0 0 0-2 2V18a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.5a2 2 0 0 0-2-2h-2.6Z" />
    <circle cx="12" cy="13" r="3.2" />
  </svg>
);

const RefreshIcon = ({ className = 'h-5 w-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M21 12a9 9 0 1 1-2.64-6.36" />
    <path d="M21 3v6h-6" />
  </svg>
);

const CloseIcon = ({ className = 'h-5 w-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

const Spinner = ({ className = 'h-8 w-8' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={`${className} animate-spin`}>
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
      opacity="0.2"
    />
    <path
      d="M22 12a10 10 0 0 0-10-10"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
    />
  </svg>
);

const CameraCapture = ({ onCapture }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const [mode, setMode] = useState('idle'); // idle | starting | live
  const [facingMode, setFacingMode] = useState('environment');
  const [error, setError] = useState(null);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) videoRef.current.srcObject = null;
    setMode('idle');
  }, []);

  const startCamera = useCallback(
    async (override) => {
      setError(null);
      setMode('starting');
      const next = override || facingMode;
      try {
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => track.stop());
          streamRef.current = null;
        }
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: next },
          audio: false,
        });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
          setMode('live');
        }
      } catch (err) {
        setMode('idle');
        setError(
          err && err.name === 'NotAllowedError'
            ? 'Camera permission was denied. Allow camera access in your browser, then try again.'
            : 'Camera access denied or not available on this device.'
        );
        console.error(err);
      }
    },
    [facingMode]
  );

  const switchCamera = useCallback(() => {
    const next = facingMode === 'environment' ? 'user' : 'environment';
    setFacingMode(next);
    startCamera(next);
  }, [facingMode, startCamera]);

  const capturePhoto = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    onCapture(canvas.toDataURL('image/jpeg', 0.9));
    stopCamera();
  }, [onCapture, stopCamera]);

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div className="mx-auto w-full">
      <canvas ref={canvasRef} className="hidden" />

      {mode === 'idle' && (
        <div className="rounded-3xl bg-white p-8 text-center shadow-xl shadow-slate-200/60 ring-1 ring-slate-100">
          <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-brand-50 text-brand-600">
            <CameraIcon className="h-8 w-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Snap the violation</h3>
          <p className="mt-1 text-sm text-slate-500">
            Point your camera at the parked vehicle and capture the plate.
          </p>
          <button
            onClick={() => startCamera()}
            className="mt-6 w-full rounded-2xl bg-brand-600 py-3 font-bold text-white shadow-lg shadow-brand-600/25 transition hover:bg-brand-700 active:scale-[0.98]"
          >
            Open Camera
          </button>
          <p className="mt-3 text-[11px] text-slate-400">
            Your photo stays on this device until you submit the report.
          </p>
        </div>
      )}

      {mode === 'starting' && (
        <div className="flex aspect-video w-full items-center justify-center rounded-3xl bg-slate-900 ring-1 ring-slate-800">
          <div className="flex flex-col items-center gap-3 text-slate-400">
            <Spinner className="h-8 w-8" />
            <p className="text-sm">Starting camera…</p>
          </div>
        </div>
      )}

      {mode === 'live' && (
        <div className="relative aspect-video w-full overflow-hidden rounded-3xl bg-black shadow-xl ring-1 ring-slate-900/10">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="h-full w-full object-cover"
          />
          <div className="pointer-events-none absolute inset-4 rounded-2xl border-2 border-white/30" />
          <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between bg-gradient-to-b from-black/60 to-transparent p-4">
            <span className="flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur">
              <span className="h-1.5 w-1.5 animate-live rounded-full bg-red-400" />
              LIVE
            </span>
            <button
              onClick={stopCamera}
              aria-label="Close camera"
              className="rounded-full bg-white/15 p-2 text-white backdrop-blur transition hover:bg-white/25 active:scale-90"
            >
              <CloseIcon className="h-4 w-4" />
            </button>
          </div>
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-8 bg-gradient-to-t from-black/70 to-transparent p-4">
            <button
              onClick={switchCamera}
              aria-label="Switch camera"
              className="rounded-full bg-white/15 p-3 text-white backdrop-blur transition hover:bg-white/25 active:scale-90"
            >
              <RefreshIcon className="h-5 w-5" />
            </button>
            <button
              onClick={capturePhoto}
              aria-label="Capture photo"
              className="h-16 w-16 rounded-full border-4 border-white bg-white/90 text-slate-900 shadow-lg transition hover:bg-white active:scale-90"
            />
            <span className="w-12" aria-hidden="true" />
          </div>
        </div>
      )}

      {error && (
        <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-600">
          <p className="text-sm font-semibold">Camera unavailable</p>
          <p className="mt-1 text-xs text-red-500">{error}</p>
          <button
            onClick={() => startCamera()}
            className="mt-3 rounded-lg bg-red-600 px-4 py-2 text-xs font-bold text-white transition hover:bg-red-700"
          >
            Try again
          </button>
        </div>
      )}
    </div>
  );
};

export default CameraCapture;