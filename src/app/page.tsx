'use client';

import React, { useState } from 'react';
import CameraCapture from '@/components/CameraCapture';
import ReportForm from '@/components/ReportForm';
import ViolationFeed from '@/components/ViolationFeed';

const STEPS = ['Capture', 'Details', 'Done'];

const CheckIcon = ({ className = 'h-4 w-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const LogoIcon = ({ className = 'h-6 w-6' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 21s-6-5.2-6-10a6 6 0 1 1 12 0c0 4.8-6 10-6 10Z" />
    <circle cx="12" cy="10.5" r="2.4" />
  </svg>
);

const SuccessCard = ({ onReset }) => (
  <div className="animate-pop rounded-3xl bg-white p-8 text-center shadow-xl shadow-slate-200/60 ring-1 ring-slate-100">
    <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-emerald-100 text-emerald-600">
      <CheckIcon className="h-9 w-9" />
    </div>
    <h2 className="text-xl font-bold text-slate-900">Report submitted!</h2>
    <p className="mt-1 text-sm text-slate-500">
      Thanks for helping keep the streets clear.
    </p>
    <button
      onClick={onReset}
      className="mt-6 w-full rounded-2xl bg-brand-600 py-3 font-bold text-white shadow-lg shadow-brand-600/25 transition hover:bg-brand-700 active:scale-[0.98]"
    >
      Report another
    </button>
  </div>
);

export default function Home() {
  const [capturedImage, setCapturedImage] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const stepIndex = isSubmitted ? 2 : capturedImage ? 1 : 0;

  const handleCapture = (image) => {
    setCapturedImage(image);
    setIsSubmitted(false);
  };

  const handleSubmitted = () => {
    setIsSubmitted(true);
    setCapturedImage(null);
  };

  const handleReset = () => {
    setCapturedImage(null);
    setIsSubmitted(false);
  };

  return (
    <main className="relative min-h-screen overflow-x-clip">
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-sky-100/70 via-slate-50 to-slate-100"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-80 w-[46rem] max-w-full -translate-x-1/2 rounded-full bg-sky-200/40 blur-3xl"
        aria-hidden="true"
      />

      <div className="mx-auto flex w-full max-w-lg flex-col gap-8 px-4 py-8 sm:py-10">
        <header className="text-center">
          <div className="inline-flex items-center gap-2.5">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-brand-600 to-sky-500 text-white shadow-lg shadow-brand-600/30">
              <LogoIcon className="h-6 w-6" />
            </span>
            <span className="text-left">
              <span className="block text-3xl font-black tracking-tight text-slate-900">
                ParkWatch
              </span>
              <span className="block text-xs font-medium text-slate-500">
                Keep our streets clear
              </span>
            </span>
          </div>
        </header>

        <nav className="flex items-start justify-center" aria-label="Report progress">
          {STEPS.map((label, i) => {
            const done = i < stepIndex;
            const active = i === stepIndex;
            return (
              <React.Fragment key={label}>
                {i > 0 && (
                  <span
                    className={`mt-4 h-0.5 w-8 sm:w-12 rounded-full transition-colors ${
                      done ? 'bg-emerald-400' : 'bg-slate-200'
                    }`}
                  />
                )}
                <div className="flex w-16 flex-col items-center gap-1.5">
                  <span
                    className={`grid h-8 w-8 place-items-center rounded-full text-xs font-bold transition-all ${
                      active
                        ? 'bg-brand-600 text-white shadow-md shadow-brand-600/30 ring-4 ring-brand-600/15'
                        : done
                          ? 'bg-emerald-500 text-white'
                          : 'bg-slate-200 text-slate-500'
                    }`}
                  >
                    {done ? <CheckIcon className="h-4 w-4" /> : i + 1}
                  </span>
                  <span
                    className={`text-[11px] font-semibold ${
                      active ? 'text-slate-900' : 'text-slate-400'
                    }`}
                  >
                    {label}
                  </span>
                </div>
              </React.Fragment>
            );
          })}
        </nav>

        <section key={stepIndex} className="animate-fade-up">
          {stepIndex === 0 && <CameraCapture onCapture={handleCapture} />}
          {stepIndex === 1 && capturedImage && (
            <ReportForm
              image={capturedImage}
              onSubmitted={handleSubmitted}
              onRetake={handleReset}
            />
          )}
          {stepIndex === 2 && <SuccessCard onReset={handleReset} />}
        </section>

        <section className="border-t border-slate-200/80 pt-8">
          <ViolationFeed />
        </section>

        <footer className="pb-2 text-center text-[11px] text-slate-400">
          ParkWatch · reported by people like you
        </footer>
      </div>
    </main>
  );
}