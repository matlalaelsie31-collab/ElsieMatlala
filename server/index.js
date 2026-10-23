import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import pool from './db.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/collections', async (req, res) => {
  try {
    const { rows } = await pool.query(
      'SELECT id, title, description, image, alt FROM collections ORDER BY sort_order'
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not load collections' });
  }
});

app.get('/api/events', async (req, res) => {
  try {
    const { rows } = await pool.query(
      'SELECT id, date, title, description, image, alt, type FROM events ORDER BY sort_order'
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not load events' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});