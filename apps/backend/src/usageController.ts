import { Request, Response } from 'express';
import { AppUsage } from './models';

export const logAppUsage = async (req: Request, res: Response) => {
  try {
    const { deviceId, appName, duration } = req.body;
    if (!deviceId || !appName || !duration) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const usage = await AppUsage.create({ deviceId, appName, duration });
    return res.status(201).json(usage);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to log usage' });
  }
};

export const getAppUsage = async (req: Request, res: Response) => {
  try {
      const { deviceId } = req.query;
      const where = deviceId ? { deviceId } : {};
    const usage = await AppUsage.findAll({ where, order: [['createdAt', 'DESC']] });
    return res.status(200).json(usage);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch usage' });
  }
};
