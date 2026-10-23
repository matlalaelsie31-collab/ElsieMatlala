CREATE TABLE IF NOT EXISTS collections (
  id          TEXT PRIMARY KEY,
  title       TEXT NOT NULL,
  description TEXT NOT NULL,
  image       TEXT NOT NULL,
  alt         TEXT NOT NULL,
  sort_order  INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS events (
  id          TEXT PRIMARY KEY,
  date        TEXT NOT NULL,
  title       TEXT NOT NULL,
  description TEXT NOT NULL,
  image       TEXT NOT NULL,
  alt         TEXT NOT NULL,
  type        TEXT NOT NULL,
  sort_order  INTEGER NOT NULL DEFAULT 0
);