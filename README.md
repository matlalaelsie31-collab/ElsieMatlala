## Live site

- App: https://YOUR-SHORT-ADDRESS.vercel.app
- API: https://elsiematlala.onrender.com/api/events

The API runs on Render's free tier, so the first request after a quiet spell can take about a minute.

## Structure

- `client/`: React + Tailwind + Vite frontend
- `server/`: Express API, Postgres (Neon), Better Auth

## Run it locally

1. Copy `server/.env.example` to `server/.env` and fill it in (database URL, auth secret).
2. Copy `client/.env.example` to `client/.env`.
3. In `server`: `npm install`, then `npm run seed`, then `npm run dev`.
4. In `client`: `npm install`, then `npm run dev`.