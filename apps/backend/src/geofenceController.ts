import { Request, Response } from 'express';
import { Geofence } from './models';

// Haversine formula to calculate distance in meters
const getDistanceFromLatLonInM = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371e3; // Radius of the earth in meters
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const deg2rad = (deg: number) => {
  return deg * (Math.PI / 180);
};

export const createGeofence = async (req: Request, res: Response) => {
  try {
    const { name, latitude, longitude, radius } = req.body;
    if (!name || !latitude || !longitude || !radius) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const geofence = await Geofence.create({ name, latitude, longitude, radius });
    return res.status(201).json(geofence);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to create geofence' });
  }
};

export const getGeofences = async (req: Request, res: Response) => {
  try {
    const geofences = await Geofence.findAll();
    return res.status(200).json(geofences);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch geofences' });
  }
};

export const checkGeofences = async (deviceId: string, lat: number, lon: number) => {
  try {
    const geofences: any[] = await Geofence.findAll();
    geofences.forEach((fence) => {
      const distance = getDistanceFromLatLonInM(lat, lon, fence.latitude, fence.longitude);
      if (distance > fence.radius) {
        console.log(`ALERT: Device ${deviceId} is OUTSIDE geofence ${fence.name}! Distance: ${distance.toFixed(2)}m`);
        // In a real app, we would send a push notification here
      } else {
          // console.log(`Device ${deviceId} is inside geofence ${fence.name}.`);
      }
    });
  } catch (error) {
    console.error('Error checking geofences:', error);
  }
};
