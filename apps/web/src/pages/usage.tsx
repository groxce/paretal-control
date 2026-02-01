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
        const res = await fetch('http://localhost:3001/api/usage', {
           headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        const data = await res.json();
        setUsageData(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsage();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 font-sans">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">App Usage</h1>
        <p className="text-gray-500 mt-1">Monitor how much time your children spend on apps.</p>
      </div>

      {loading ? <div className="text-gray-500 animate-pulse">Loading...</div> : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-semibold text-gray-700">Date</th>
                <th className="px-6 py-4 font-semibold text-gray-700">Device ID</th>
                <th className="px-6 py-4 font-semibold text-gray-700">Application</th>
                <th className="px-6 py-4 font-semibold text-gray-700">Duration</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {usageData.length === 0 ? (
                 <tr><td colSpan={4} className="px-6 py-8 text-center text-gray-500">No usage data recorded.</td></tr>
              ) : (
                usageData.map((item, idx) => (
                  <tr key={item.id || idx} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-gray-600">{item.date}</td>
                    <td className="px-6 py-4 font-medium text-gray-900">{item.deviceId}</td>
                    <td className="px-6 py-4 text-gray-600">{item.appName}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {item.duration} mins
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UsagePage;
