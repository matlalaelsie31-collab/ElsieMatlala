import 'dotenv/config';
import { getMigrations } from 'better-auth/db/migration';
import { auth } from './auth.js';
import pool from './db.js';

const { toBeCreated, toBeAdded, runMigrations } = await getMigrations(auth.options);

console.log('Tables to create:', toBeCreated.map((t) => t.table));
console.log('Tables to add columns to:', toBeAdded.map((t) => t.table));

await runMigrations();
console.log('Auth migration finished');

await pool.end();