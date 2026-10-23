import { useState } from 'react';
import { events, eventTypes } from '../data/items';
import EventCard from './EventCard';

export default function Events() {
  const [filter, setFilter] = useState('All');
  const [savedIds, setSavedIds] = useState([]);

  const visibleEvents =
    filter === 'All' ? events : events.filter((e) => e.type === filter);

  const toggleSaved = (id) =>
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  return (
    <section
      id="events"
      className="mx-auto mb-20 w-[90%] max-w-[1200px] scroll-mt-24"
    >
      <h2 className="mb-6 text-center text-3xl font-bold text-accent">
        Upcoming Events
      </h2>

      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {eventTypes.map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => setFilter(type)}
            aria-pressed={filter === type}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
              filter === type
                ? 'border-accent bg-accent text-white'
                : 'border-line bg-surface hover:bg-cream'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {visibleEvents.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            saved={savedIds.includes(event.id)}
            onToggleSaved={() => toggleSaved(event.id)}
          />
        ))}
      </div>
    </section>
  );
}