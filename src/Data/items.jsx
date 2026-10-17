export const collections = [
  {
    id: 'fiction',
    title: 'Fiction',
    description:
      'Dive into bestselling novels, literary favourites, fantasy adventures, mysteries, and contemporary stories.',
    image: '/public/Images/fiction.jpg',
    alt: 'Shelves of fiction books',
  },
  {
    id: 'nonfiction',
    title: 'Nonfiction',
    description:
      'Explore history, science, business, biographies, and inspiring real-life stories.',
    image: '/public/Images/non-fiction.jpg',
    alt: 'A stack of nonfiction books',
  },
  {
    id: 'staff-picks',
    title: 'Staff Picks',
    description:
      'Discover hand-picked favourites selected by our passionate booksellers and reading community.',
    image: '/public/Images/staff-picks.jpg',
    alt: 'Staff recommended books on display',
  },
];

export const events = [
  {
    id: 'author-night',
    date: '15 OCT',
    title: 'Author Reading Night',
    description:
      'Meet local authors, enjoy live readings, and take part in audience Q&A sessions.',
    image: '/public/Images/author-night.jpg',
    alt: 'An author reading to an audience',
    type: 'Readings',
  },
  {
    id: 'book-club',
    date: '22 OCT',
    title: 'Monthly Book Club',
    description:
      "Join fellow readers for coffee, discussion, and conversation around this month's featured novel.",
    image: '/public/Images/book-club.jpg',
    alt: 'Readers chatting over coffee',
    type: 'Community',
  },
  {
    id: 'poetry-night',
    date: '30 OCT',
    title: 'Poetry & Open Mic',
    description:
      'Share your work, discover local talent, and enjoy an evening of creativity.',
    image: '/public/Images/poetry-night.jpg',
    alt: 'A poet performing at an open mic',
    type: 'Readings',
  },
    {
    id: 'kids-story-time',
    date: '8 NOV',
    title: 'Kids Story Time',
    description:
      'Bring the little ones for a morning of picture books, songs, and imaginative play.',
    image: '/public/images/kids-story-time.jpg',
    alt: 'Children listening to a story',
    type: 'Family',
  },
];

// Built from the data above, so a new event type automatically gets a filter button
export const eventTypes = ['All', ...new Set(events.map((e) => e.type))];