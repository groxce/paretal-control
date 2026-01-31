import { Request, Response } from 'express';

// In-memory storage for demonstration purposes
// In a real enterprise app, this would be a database (e.g., PostgreSQL/MongoDB)
interface LocationData {
  deviceId: string;
  latitude: number;
  longitude: number;
  timestamp: number;
}

const locationHistory: LocationData[] = [];

export const updateLocation = (req: Request, res: Response) => {
  const { deviceId, latitude, longitude } = req.body;

  if (!deviceId || !latitude || !longitude) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const newLocation: LocationData = {
    deviceId,
    latitude,
    longitude,
    timestamp: Date.now(),
  };

  locationHistory.push(newLocation);

  // Keep only the last 100 records for memory efficiency in this demo
  if (locationHistory.length > 100) {
    locationHistory.shift();
  }

  console.log(`Location received for ${deviceId}: ${latitude}, ${longitude}`);
  return res.status(200).json({ message: 'Location updated', data: newLocation });
};

export const getLocationHistory = (req: Request, res: Response) => {
  const { deviceId } = req.query;

  if (deviceId) {
    const history = locationHistory.filter(loc => loc.deviceId === deviceId);
    return res.status(200).json(history);
  }

  // If no deviceId, return all (or handle accordingly)
  // For this demo, we'll just return the whole history sorted by latest
  const sortedHistory = [...locationHistory].sort((a, b) => b.timestamp - a.timestamp);
  return res.status(200).json(sortedHistory);
};
