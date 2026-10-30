import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { toNodeHandler, fromNodeHeaders } from 'better-auth/node';
import pool from './db.js';
import { auth } from './auth.js';
import requireAuth from './middleware/requireAuth.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

// Auth must come BEFORE express.json()
app.all('/api/auth/*splat', toNodeHandler(auth));

app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/protected-test', requireAuth, (req, res) => {
  res.json({ ok: true, userId: req.user.id, email: req.user.email });
});

app.get('/api/me', async (req, res) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });
  res.json(session);
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