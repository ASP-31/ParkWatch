import React, { useState } from 'react';
import { supabase } from '@/config/supabase';

const ReportForm = ({ image, onSubmitted }) => {
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image || !vehicleNumber || !location) return;

    setLoading(true);
    setError(null);

    try {
      // 1. Sign in anonymously (only if no session exists)
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        const { error: authError } = await supabase.auth.signInAnonymously();
        if (authError) throw authError;
      }

      // 2. Upload image to Supabase Storage
      const bucket = process.env.NEXT_PUBLIC_STORAGE_BUCKET || 'violations';
      const fileName = `${Date.now()}_${vehicleNumber}.jpg`;
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
      const { error: dbError } = await supabase
        .from('violations')
        .insert([{ 
          vehicle_number: vehicleNumber, 
          location: location, 
          photo_url: publicUrl,
          created_at: new Date().toISOString() 
        }]);

      if (dbError) throw dbError;

      onSubmitted();
    } catch (err) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md mx-auto p-4 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold text-gray-800">Submit Report</h2>
      
      <div className="relative w-full aspect-video bg-gray-100 rounded-lg overflow-hidden">
        <img src={image} alt="Captured violation" className="w-full h-full object-cover" />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-600">Vehicle Number</label>
        <input 
          type="text" 
          value={vehicleNumber} 
          onChange={(e) => setVehicleNumber(e.target.value)}
          className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="ABC-1234"
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-600">Location</label>
        <input 
          type="text" 
          value={location} 
          onChange={(e) => setLocation(e.target.value)}
          className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Main St & 5th Ave"
          required
        />
      </div>

      {error && <p className="text-red-500 text-xs">{error}</p>}

      <button 
        type="submit" 
        disabled={loading}
        className="bg-green-600 text-white py-3 rounded-lg font-bold shadow-lg active:scale-95 transition-transform disabled:opacity-50"
      >
        {loading ? 'Submitting...' : 'Submit Report'}
      </button>
    </form>
  );
};

export default ReportForm;
