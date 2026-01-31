import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import sequelize from './database';
import { updateLocation, getLocationHistory } from './locationController';
import { createGeofence, getGeofences } from './geofenceController';
import { logAppUsage, getAppUsage } from './usageController';

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Safeguard Kids Backend is running');
});

// Location Routes
app.post('/api/location', updateLocation);
app.get('/api/location', getLocationHistory);

// Geofence Routes
app.post('/api/geofence', createGeofence);
app.get('/api/geofence', getGeofences);

// App Usage Routes
app.post('/api/usage', logAppUsage);
app.get('/api/usage', getAppUsage);

// Sync Database and Start Server
sequelize.sync().then(() => {
  console.log('Database synced');
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}).catch((err) => {
  console.error('Failed to sync database:', err);
});
