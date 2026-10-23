import fs from 'fs';
import pool from './db.js';

const collections = [
  {
    id: 'fiction',
    title: 'Fiction',
    description:
      'Dive into bestselling novels, literary favourites, fantasy adventures, mysteries, and contemporary stories.',
    image: '/images/fiction.jpg',
    alt: 'Shelves of fiction books',
  },
  {
    id: 'nonfiction',
    title: 'Nonfiction',
    description:
      'Explore history, science, business, biographies, and inspiring real-life stories.',
    image: '/images/non-fiction.jpg',
    alt: 'A stack of nonfiction books',
  },
  {
    id: 'staff-picks',
    title: 'Staff Picks',
    description:
      'Discover hand-picked favourites selected by our passionate booksellers and reading community.',
    image: '/images/staff-picks.jpg',
    alt: 'Staff recommended books on display',
  },
];

const events = [
  {
    id: 'author-night',
    date: '15 OCT',
    title: 'Author Reading Night',
    description:
      'Meet local authors, enjoy live readings, and take part in audience Q&A sessions.',
    image: '/images/author-night.jpg',
    alt: 'An author reading to an audience',
    type: 'Readings',
  },
  {
    id: 'book-club',
    date: '22 OCT',
    title: 'Monthly Book Club',
    description:
      "Join fellow readers for coffee, discussion, and conversation around this month's featured novel.",
    image: 'images/book-club.jpg',
    alt: 'Readers chatting over coffee',
    type: 'Community',
  },
  {
    id: 'poetry-night',
    date: '30 OCT',
    title: 'Poetry & Open Mic',
    description:
      'Share your work, discover local talent, and enjoy an evening of creativity.',
    image: '/images/poetry-night.jpg',
    alt: 'A poet performing at an open mic',
    type: 'Readings',
  },
  {
    id: 'kids-story-time',
    date: '8 NOV',
    title: 'Kids Story Time',
    description:
      'Bring the little ones for a morning of picture books, songs, and imaginative play.',
    image: '/images/kids-story-time.jpg',
    alt: 'Children listening to a story',
    type: 'Family',
  },
];


async function seed() {
  const schema = fs.readFileSync(new URL('./schema.sql', import.meta.url), 'utf8');
  await pool.query(schema);

  await pool.query('DELETE FROM collections');
  await pool.query('DELETE FROM events');

  for (const [i, c] of collections.entries()) {
    await pool.query(
      `INSERT INTO collections (id, title, description, image, alt, sort_order)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [c.id, c.title, c.description, c.image, c.alt, i]
    );
  }

  for (const [i, e] of events.entries()) {
    await pool.query(
      `INSERT INTO events (id, date, title, description, image, alt, type, sort_order)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [e.id, e.date, e.title, e.description, e.image, e.alt, e.type, i]
    );
  }

  console.log('Seeded:', collections.length, 'collections,', events.length, 'events');
  await pool.end();
}

seed().catch((err) => {
  console.error('Seed failed:', err.message);
  process.exit(1);
});