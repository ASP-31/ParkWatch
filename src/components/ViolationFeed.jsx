import React, { useEffect, useState } from 'react';
import { supabase } from '@/config/supabase';

const ViolationFeed = () => {
  const [violations, setViolations] = useState([]);

  const fetchViolations = async () => {
    const { data, error } = await supabase
      .from('violations')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) console.error('Error fetching violations:', error);
    else setViolations(data || []);
  };

  useEffect(() => {
    fetchViolations();

    // Real-time subscription
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'violations' },
        (payload) => {
          setViolations((prev) => [payload.new, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="w-full max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Live Feed</h2>
      <div className="flex flex-col gap-4">
        {violations.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No violations reported yet.</p>
        ) : (
          violations.map((v) => (
            <div key={v.id} className="bg-white p-3 rounded-xl shadow-sm flex gap-4 items-center">
              <img src={v.photo_url} alt="Violation" className="w-20 h-20 object-cover rounded-lg" />
              <div className="flex flex-col">
                <span className="font-bold text-gray-900">{v.vehicle_number}</span>
                <span className="text-sm text-gray-600">{v.location}</span>
                <span className="text-[10px] text-gray-400">
                  {new Date(v.created_at).toLocaleString()}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ViolationFeed;
