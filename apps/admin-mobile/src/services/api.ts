import AsyncStorage from '@react-native-async-storage/async-storage';

// Replace with your actual backend IP/URL.
// For Android Emulator, use 'http://10.0.2.2:3001'
// For Physical Device, use 'http://YOUR_LOCAL_IP:3001'
const BASE_URL = 'http://10.0.2.2:3001/api';

const getHeaders = async () => {
  const token = await AsyncStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const api = {
  login: async (email, password) => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error('Login failed');
    const data = await res.json();
    await AsyncStorage.setItem('token', data.token);
    return data;
  },

  getLocations: async () => {
    const headers = await getHeaders();
    const res = await fetch(`${BASE_URL}/location`, { headers });
    return res.json();
  },

  getGeofences: async () => {
    const headers = await getHeaders();
    const res = await fetch(`${BASE_URL}/geofence`, { headers });
    return res.json();
  },

  addGeofence: async (geofence) => {
    const headers = await getHeaders();
    const res = await fetch(`${BASE_URL}/geofence`, {
      method: 'POST',
      headers,
      body: JSON.stringify(geofence),
    });
    return res.json();
  },

  getAppUsage: async () => {
    const headers = await getHeaders();
    const res = await fetch(`${BASE_URL}/usage`, { headers });
    return res.json();
  },

  logout: async () => {
    await AsyncStorage.removeItem('token');
  }
};
