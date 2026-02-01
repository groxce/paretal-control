import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface LocationData {
  deviceId: string;
  latitude: number;
  longitude: number;
  timestamp: number;
}

const Dashboard = () => {
  const [locations, setLocations] = useState<LocationData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/location');
        if (!response.ok) {
          throw new Error('Failed to fetch location data');
        }
        const data = await response.json();
        setLocations(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
    const interval = setInterval(fetchLocations, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 font-sans">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Real-time overview of your connected devices.</p>
      </div>

      {loading && <div className="text-gray-500 animate-pulse">Loading data...</div>}
      {error && <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-200">{error}</div>}

      {!loading && !error && (
        <>
          {locations.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
              <p className="text-gray-500 text-lg">No location data available.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {locations.map((loc, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{loc.deviceId}</h3>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-1">
                        Online
                      </span>
                    </div>
                    <Link href={`/live/${loc.deviceId}`} className="text-sm font-semibold text-primary bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors">
                      Monitor Live
                    </Link>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Latitude:</span>
                      <span className="font-medium text-gray-900">{loc.latitude.toFixed(4)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Longitude:</span>
                      <span className="font-medium text-gray-900">{loc.longitude.toFixed(4)}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-gray-100">
                      <span>Last Update:</span>
                      <span className="font-medium text-gray-900">{new Date(loc.timestamp).toLocaleTimeString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;
