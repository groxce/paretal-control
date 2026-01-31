import React, { useEffect, useState } from 'react';

interface AppUsage {
  id?: number;
  deviceId: string;
  appName: string;
  duration: number; // minutes
  date: string;
}

const UsagePage = () => {
  const [usageData, setUsageData] = useState<AppUsage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsage = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/usage');
        const data = await res.json();
        setUsageData(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsage();
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>App Usage Monitoring</h1>

      {loading ? <p>Loading...</p> : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2', textAlign: 'left' }}>
              <th style={{ padding: '10px' }}>Date</th>
              <th style={{ padding: '10px' }}>Device ID</th>
              <th style={{ padding: '10px' }}>Application</th>
              <th style={{ padding: '10px' }}>Duration (mins)</th>
            </tr>
          </thead>
          <tbody>
            {usageData.length === 0 ? (
               <tr><td colSpan={4} style={{ padding: '10px' }}>No usage data recorded.</td></tr>
            ) : (
              usageData.map((item, idx) => (
                <tr key={item.id || idx} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '10px' }}>{item.date}</td>
                  <td style={{ padding: '10px' }}>{item.deviceId}</td>
                  <td style={{ padding: '10px' }}>{item.appName}</td>
                  <td style={{ padding: '10px' }}>{item.duration}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UsagePage;
