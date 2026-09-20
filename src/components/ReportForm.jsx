import React, { useState } from 'react';
import { supabase } from '@/config/supabase';

const CarIcon = ({ className = 'h-4 w-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M5 11l1.5-4.5A2 2 0 0 1 8.4 5h7.2a2 2 0 0 1 1.9 1.5L19 11" />
    <path d="M4 11h16a1 1 0 0 1 1 1v4h-2v2H5v-2H3v-4a1 1 0 0 1 1-1Z" />
    <circle cx="7.5" cy="15.5" r="1.2" fill="currentColor" stroke="none" />
    <circle cx="16.5" cy="15.5" r="1.2" fill="currentColor" stroke="none" />
  </svg>
);

const MapPinIcon = ({ className = 'h-4 w-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const Spinner = ({ className = 'h-5 w-5' }) => (
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

const ReportForm = ({ image, onSubmitted, onRetake }) => {
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const number = vehicleNumber.trim();
    const place = location.trim();
    if (!image || !number || !place) return;

    setLoading(true);
    setError(null);

    try {
      // 1. Sign in anonymously (only if no session exists)
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        const { error: authError } = await supabase.auth.signInAnonymously();
        if (authError) throw authError;
      }

      // 2. Upload image to Supabase Storage
      const bucket = process.env.NEXT_PUBLIC_STORAGE_BUCKET || 'violations';
      const fileName = `${Date.now()}_${number}.jpg`;
      const imageData = await fetch(image);
      const blob = await imageData.blob();

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(fileName, blob);

      if (uploadError) throw uploadError;

      const publicUrl = supabase.storage
        .from(bucket)
        .getPublicUrl(fileName).data.publicUrl;

      // 3. Save report to Database
      const { error: dbError } = await supabase.from('violations').insert([
        {
          vehicle_number: number,
          location: place,
          photo_url: publicUrl,
          created_at: new Date().toISOString(),
        },
      ]);

      if (dbError) throw dbError;

      onSubmitted();
    } catch (err) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="overflow-hidden rounded-3xl bg-white shadow-xl shadow-slate-200/60 ring-1 ring-slate-100"
    >
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Report details</h2>
          <p className="text-xs text-slate-500">Check the capture, then submit</p>
        </div>
        <button
          type="button"
          onClick={onRetake}
          className="rounded-lg px-3 py-1.5 text-xs font-semibold text-brand-600 transition hover:bg-brand-50"
        >
          Retake
        </button>
      </div>

      <div className="flex flex-col gap-5 p-5">
        <div className="relative aspect-video overflow-hidden rounded-2xl bg-slate-100">
          <img
            src={image}
            alt="Captured violation"
            className="h-full w-full object-cover"
          />
          <span className="absolute bottom-2 left-2 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-semibold text-white backdrop-blur">
            PHOTO · READY
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="vehicleNumber" className="text-sm font-semibold text-slate-700">
            Vehicle number
          </label>
          <div className="relative">
            <CarIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              id="vehicleNumber"
              type="text"
              value={vehicleNumber}
              onChange={(e) => setVehicleNumber(e.target.value.toUpperCase())}
              placeholder="ABC-1234"
              required
              disabled={loading}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 font-mono text-base uppercase tracking-wide text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand-500/10 disabled:opacity-60"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="location" className="text-sm font-semibold text-slate-700">
            Location
          </label>
          <div className="relative">
            <MapPinIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              id="location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Main St & 5th Ave"
              required
              disabled={loading}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand-500/10 disabled:opacity-60"
            />
          </div>
        </div>

        {error && (
          <p className="rounded-xl bg-red-50 px-3 py-2 text-xs font-medium text-red-600">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 py-3 font-bold text-white shadow-lg shadow-emerald-600/25 transition hover:bg-emerald-700 active:scale-[0.98] disabled:opacity-60 disabled:hover:bg-emerald-600"
        >
          {loading ? (
            <>
              <Spinner className="h-5 w-5" />
              Submitting…
            </>
          ) : (
            'Submit report'
          )}
        </button>
        <p className="-mt-2 text-center text-[11px] text-slate-400">
          Your report appears in the live feed instantly.
        </p>
      </div>
    </form>
  );
};

export default ReportForm;