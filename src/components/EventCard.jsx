import FavouriteButton from './FavouriteButton';

export default function EventCard({ event, saved, onToggleSaved }) {
  return (
    <article className="overflow-hidden rounded-2xl bg-surface shadow-soft transition duration-300 hover:-translate-y-2 hover:shadow-lift">
      <img
        src={event.image}
        alt={event.alt}
        className="h-56 w-full object-cover md:h-[280px]"
      />
      <div className="p-4 sm:p-6">
        <div className="mb-4 flex items-center justify-between gap-2">
          <span className="rounded-full bg-accent px-3 py-2 text-sm font-semibold text-white">
            {event.date}
          </span>
          <FavouriteButton
            active={saved}
            onToggle={onToggleSaved}
            label={event.title}
          />
        </div>
        <h3 className="mb-2 text-xl font-bold">{event.title}</h3>
        <p>{event.description}</p>
      </div>
    </article>
  );
}