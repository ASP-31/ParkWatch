import React, { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/config/supabase';

const timeAgo = (iso) => {
  const seconds = (Date.now() - new Date(iso).getTime()) / 1000;
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 14) return `${days}d ago`;
  return new Date(iso).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
  });
};

const MapPinIcon = ({ className = 'h-3.5 w-3.5' }) => (
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

const ClockIcon = ({ className = 'h-3 w-3' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

const ShieldIcon = ({ className = 'h-6 w-6' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-3Z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

const CameraIcon = ({ className = 'h-6 w-6' }) => (
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

const ViolationFeed = () => {
  const [violations, setViolations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [, setTick] = useState(0);

  const fetchViolations = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error: fetchError } = await supabase
      .from('violations')
      .select('*')
      .order('created_at', { ascending: false });

    if (fetchError) {
      console.error('Error fetching violations:', fetchError);
      setError('Could not load the live feed.');
    } else {
      setViolations(data || []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchViolations();

    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'violations' },
        (payload) => {
          const row = payload.new;
          if (!row) return;
          setViolations((prev) =>
            prev.some((v) => v.id === row.id) ? prev : [row, ...prev]
          );
        }
      )
      .subscribe();

    const interval = setInterval(() => setTick((n) => n + 1), 60000);

    return () => {
      supabase.removeChannel(channel);
      clearInterval(interval);
    };
  }, [fetchViolations]);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-bold text-slate-900">Live feed</h2>
          <span className="h-2 w-2 animate-live rounded-full bg-emerald-500" />
        </div>
        {violations.length > 0 && (
          <span className="rounded-full bg-slate-200/70 px-2.5 py-0.5 text-xs font-bold text-slate-600">
            {violations.length}
          </span>
        )}
      </div>

      {loading ? (
        <div className="flex flex-col gap-3">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="flex animate-pulse gap-3 rounded-2xl bg-white p-3 ring-1 ring-slate-100"
            >
              <div className="h-20 w-20 shrink-0 rounded-xl bg-slate-200" />
              <div className="flex flex-1 flex-col justify-center gap-2">
                <div className="h-3.5 w-24 rounded-full bg-slate-200" />
                <div className="h-3 w-32 rounded-full bg-slate-200" />
                <div className="h-2.5 w-16 rounded-full bg-slate-200" />
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-red-100 bg-red-50 p-5 text-center">
          <p className="text-sm font-semibold text-red-600">
            Couldn’t load the feed
          </p>
          <button
            onClick={fetchViolations}
            className="mt-2 text-xs font-bold text-red-600 underline"
          >
            Retry
          </button>
        </div>
      ) : violations.length === 0 ? (
        <div className="rounded-2xl bg-white p-8 text-center ring-1 ring-slate-100">
          <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-slate-100 text-slate-400">
            <ShieldIcon className="h-6 w-6" />
          </div>
          <p className="text-sm font-semibold text-slate-600">
            No violations reported yet
          </p>
          <p className="mt-1 text-xs text-slate-400">
            Be the first — snap a photo above to get things started.
          </p>
        </div>
      ) : (
        <ul className="flex flex-col gap-3">
          {violations.map((v) => (
            <li
              key={v.id}
              className="flex animate-fade-up gap-3 rounded-2xl bg-white p-3 shadow-sm ring-1 ring-slate-100 transition hover:shadow-md"
            >
              <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                {v.photo_url ? (
                  <img
                    src={v.photo_url}
                    alt={`${v.vehicle_number} violation`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="grid h-full w-full place-items-center text-slate-300">
                    <CameraIcon className="h-6 w-6" />
                  </div>
                )}
              </div>
              <div className="flex min-w-0 flex-1 flex-col justify-center gap-0.5">
                <span className="w-fit rounded-md bg-slate-900 px-2 py-0.5 font-mono text-xs font-bold tracking-wider text-white">
                  {v.vehicle_number}
                </span>
                <span className="mt-1 flex items-center gap-1 text-sm font-medium text-slate-700">
                  <MapPinIcon className="h-3.5 w-3.5 text-brand-500" />
                  <span className="truncate">{v.location}</span>
                </span>
                <span
                  className="flex items-center gap-1 text-[11px] text-slate-400"
                  title={new Date(v.created_at).toLocaleString()}
                >
                  <ClockIcon className="h-3 w-3" />
                  {timeAgo(v.created_at)}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViolationFeed;