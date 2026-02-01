import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import sequelize from './database';
import { updateLocation, getLocationHistory } from './locationController';
import { createGeofence, getGeofences } from './geofenceController';
import { logAppUsage, getAppUsage } from './usageController';
import { register, login } from './authController';
import { authMiddleware } from './authMiddleware';

const app = express();
const port = 3001;

// Security Middleware
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());

// Rate Limiting (100 requests per 15 minutes)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

app.get('/', (req: Request, res: Response) => {
  res.send('Safeguard Kids Backend is running');
});

// Auth Routes
app.post('/api/auth/register', register);
app.post('/api/auth/login', login);

// Location Routes (Public for device reporting, Protected for viewing history in a real scenario)
// For now, we leave POST public for the child device, but GET could be protected.
app.post('/api/location', updateLocation);
app.get('/api/location', getLocationHistory); // In real app, protect this

// Protected Routes
app.post('/api/geofence', authMiddleware, createGeofence);
app.get('/api/geofence', authMiddleware, getGeofences);

app.post('/api/usage', authMiddleware, logAppUsage); // Typically public for device, protected for viewing
app.get('/api/usage', authMiddleware, getAppUsage);

// Sync Database and Start Server
sequelize.sync().then(() => {
  console.log('Database synced');
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}).catch((err) => {
  console.error('Failed to sync database:', err);
});
