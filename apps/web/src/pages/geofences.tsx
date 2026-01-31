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
      const res = await fetch('http://localhost:3001/api/geofence');
      const data = await res.json();
      setGeofences(data);
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newGeofence)
      });
      fetchGeofences();
      setNewGeofence({ name: '', latitude: 0, longitude: 0, radius: 100 });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Geofences</h1>

      <div style={{ marginBottom: '30px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
        <h3>Add New Geofence</h3>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="Name (e.g., Home)"
            value={newGeofence.name}
            onChange={e => setNewGeofence({...newGeofence, name: e.target.value})}
            required
            style={{ padding: '8px' }}
          />
          <input
            type="number"
            step="any"
            placeholder="Latitude"
            value={newGeofence.latitude}
            onChange={e => setNewGeofence({...newGeofence, latitude: parseFloat(e.target.value)})}
            required
            style={{ padding: '8px' }}
          />
          <input
            type="number"
            step="any"
            placeholder="Longitude"
            value={newGeofence.longitude}
            onChange={e => setNewGeofence({...newGeofence, longitude: parseFloat(e.target.value)})}
            required
            style={{ padding: '8px' }}
          />
          <input
            type="number"
            placeholder="Radius (meters)"
            value={newGeofence.radius}
            onChange={e => setNewGeofence({...newGeofence, radius: parseFloat(e.target.value)})}
            required
            style={{ padding: '8px' }}
          />
          <button type="submit" style={{ padding: '8px 16px', backgroundColor: '#0070f3', color: '#fff', border: 'none', cursor: 'pointer' }}>
            Add Geofence
          </button>
        </form>
      </div>

      {loading ? <p>Loading...</p> : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2', textAlign: 'left' }}>
              <th style={{ padding: '10px' }}>Name</th>
              <th style={{ padding: '10px' }}>Latitude</th>
              <th style={{ padding: '10px' }}>Longitude</th>
              <th style={{ padding: '10px' }}>Radius (m)</th>
            </tr>
          </thead>
          <tbody>
            {geofences.map((geo, idx) => (
              <tr key={geo.id || idx} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '10px' }}>{geo.name}</td>
                <td style={{ padding: '10px' }}>{geo.latitude}</td>
                <td style={{ padding: '10px' }}>{geo.longitude}</td>
                <td style={{ padding: '10px' }}>{geo.radius}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default GeofencesPage;
