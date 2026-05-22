import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { connectDatabase } from './config/database.js';
import apiRouter from './routes/index.js';

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 8000);

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api', apiRouter);

async function startServer() {
  await connectDatabase();

  app.listen(port, () => {
    console.log(`OctoFit Tracker backend listening on port ${port}`);
  });
}

startServer().catch((error) => {
  console.error('Failed to start OctoFit Tracker backend:', error);
  process.exit(1);
});
