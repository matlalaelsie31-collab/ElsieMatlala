# Corner Shelf Books

An independent bookstore website, rebuilt from plain HTML/CSS into **React + Tailwind CSS**.

## Features

- Componentized layout: Header, Hero, Collections, Community Banner, Events, Footer
- All collections and events stored in one data file (`src/data/items.js`)
- **Event filter** built with `useState`, so visitors can filter by event type
- **Reusable controlled component** (`FavouriteButton`) used on every event card
- Mobile-first responsive design with Tailwind (`sm:`, `md:`, `lg:`)
- No horizontal scroll on any screen size

## Built with

- [Vite](https://vite.dev/)
- [React](https://react.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/)

No TypeScript and no extra libraries. All data is hardcoded.

## Project structure

```
src/
  data/items.js            collections and events data
  components/
    Header.jsx
    Hero.jsx
    Collections.jsx
    BookCard.jsx
    CommunityBanner.jsx
    Events.jsx             filter state lives here
    EventCard.jsx
    FavouriteButton.jsx    controlled, reusable toggle
    Footer.jsx
  App.jsx
  main.jsx
  index.css                Tailwind and theme colours
public/images/             site pictures
```

## Run it locally

```bash
npm install
npm run dev
```

Then open the link shown in the terminal (usually http://localhost:5173).

## What changed from the original site

| Before | After |
|---|---|
| Static `index.html` with copy-pasted cards | Components rendered from a data array |
| `style.css` with media queries | Tailwind utility classes, mobile-first |
| No interactivity | Event filter and "Interested" toggle |

Save and upload

git add README.md
git commit -m "docs: rewrite README for React + Tailwind version"
git push
