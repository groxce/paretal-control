import React, { useEffect, useState } from 'react';

interface Geofence {
  id?: number;
  name: string;
  latitude: number;
  longitude: number;
  radius: number;
}

const GeofencesPage = () => {
  const [geofences, setGeofences] = useState<Geofence[]>([]);
  const [loading, setLoading] = useState(true);
  const [newGeofence, setNewGeofence] = useState<Geofence>({
    name: '',
    latitude: 0,
    longitude: 0,
    radius: 100
  });

  const fetchGeofences = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/geofence', {
         headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const data = await res.json();
      setGeofences(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGeofences();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('http://localhost:3001/api/geofence', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(newGeofence)
      });
      fetchGeofences();
      setNewGeofence({ name: '', latitude: 0, longitude: 0, radius: 100 });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 font-sans">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Geofences</h1>
        <p className="text-gray-500 mt-1">Set up safe zones for your children.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Add New Geofence</h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Name (e.g., Home)"
            value={newGeofence.name}
            onChange={e => setNewGeofence({...newGeofence, name: e.target.value})}
            required
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
          />
          <input
            type="number"
            step="any"
            placeholder="Latitude"
            value={newGeofence.latitude}
            onChange={e => setNewGeofence({...newGeofence, latitude: parseFloat(e.target.value)})}
            required
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
          />
          <input
            type="number"
            step="any"
            placeholder="Longitude"
            value={newGeofence.longitude}
            onChange={e => setNewGeofence({...newGeofence, longitude: parseFloat(e.target.value)})}
            required
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
          />
          <div className="flex gap-2">
             <input
              type="number"
              placeholder="Radius (m)"
              value={newGeofence.radius}
              onChange={e => setNewGeofence({...newGeofence, radius: parseFloat(e.target.value)})}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
            />
            <button type="submit" className="px-6 py-2 bg-primary text-white rounded-lg font-bold hover:bg-blue-700 transition-colors whitespace-nowrap">
              Add
            </button>
          </div>
        </form>
      </div>

      {loading ? <div className="text-gray-500 animate-pulse">Loading...</div> : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-semibold text-gray-700">Name</th>
                <th className="px-6 py-4 font-semibold text-gray-700">Latitude</th>
                <th className="px-6 py-4 font-semibold text-gray-700">Longitude</th>
                <th className="px-6 py-4 font-semibold text-gray-700">Radius</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {geofences.map((geo, idx) => (
                <tr key={geo.id || idx} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{geo.name}</td>
                  <td className="px-6 py-4 text-gray-600">{geo.latitude}</td>
                  <td className="px-6 py-4 text-gray-600">{geo.longitude}</td>
                  <td className="px-6 py-4 text-gray-600">{geo.radius}m</td>
                </tr>
              ))}
            </tbody>
          </table>
          {geofences.length === 0 && (
              <div className="p-6 text-center text-gray-500">No geofences found.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default GeofencesPage;
