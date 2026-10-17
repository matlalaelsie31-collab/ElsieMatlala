export default function FavouriteButton({ active, onToggle, label }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={active}
      aria-label={
        active
          ? `Remove ${label} from interested list`
          : `Mark ${label} as interested`
      }
      className={`rounded-full border px-3 py-1.5 text-sm font-semibold transition-colors ${
        active
          ? 'border-accent bg-accent text-white'
          : 'border-line bg-surface text-accent hover:bg-cream'
      }`}
    >
      {active ? '♥ Interested' : '♡ Interested'}
    </button>
  );
}