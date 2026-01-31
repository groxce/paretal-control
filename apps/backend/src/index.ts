import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { updateLocation, getLocationHistory } from './locationController';

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

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
