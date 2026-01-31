import React, { useEffect, useState } from 'react';

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
    // Poll every 5 seconds
    const interval = setInterval(fetchLocations, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Safeguard Kids - Parent Dashboard</h1>
      <p>Real-time monitoring of registered devices.</p>

      {loading && <p>Loading data...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {!loading && !error && (
        <div>
          <h2>Recent Locations</h2>
          {locations.length === 0 ? (
            <p>No location data available.</p>
          ) : (
            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
              <thead>
                <tr style={{ backgroundColor: '#f2f2f2' }}>
                  <th style={{ padding: '8px', border: '1px solid #ddd' }}>Device ID</th>
                  <th style={{ padding: '8px', border: '1px solid #ddd' }}>Latitude</th>
                  <th style={{ padding: '8px', border: '1px solid #ddd' }}>Longitude</th>
                  <th style={{ padding: '8px', border: '1px solid #ddd' }}>Time</th>
                </tr>
              </thead>
              <tbody>
                {locations.map((loc, index) => (
                  <tr key={index}>
                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>{loc.deviceId}</td>
                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>{loc.latitude}</td>
                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>{loc.longitude}</td>
                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>{new Date(loc.timestamp).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
