import 'dotenv/config';
import { betterAuth } from 'better-auth';
import pool from './db.js';

export const auth = betterAuth({
  database: pool,
  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins: [process.env.CLIENT_URL || 'http://localhost:5173'],
});