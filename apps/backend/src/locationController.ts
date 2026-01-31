import { Request, Response } from 'express';
import { Location } from './models';
import { checkGeofences } from './geofenceController';

export const updateLocation = async (req: Request, res: Response) => {
  try {
    const { deviceId, latitude, longitude } = req.body;

    if (!deviceId || !latitude || !longitude) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newLocation = await Location.create({
      deviceId,
      latitude,
      longitude,
    });

    // Async check for geofence violations
    checkGeofences(deviceId, latitude, longitude);

    console.log(`Location received for ${deviceId}: ${latitude}, ${longitude}`);
    return res.status(200).json({ message: 'Location updated', data: newLocation });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const getLocationHistory = async (req: Request, res: Response) => {
  try {
    const { deviceId } = req.query;
    const where = deviceId ? { deviceId } : {};

    const history = await Location.findAll({
      where,
      order: [['timestamp', 'DESC']],
      limit: 100 // Limit for performance
    });

    return res.status(200).json(history);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch location history' });
  }
};
