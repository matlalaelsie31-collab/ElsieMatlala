import useApi from '../hooks/useApi';
import BookCard from "./BookCard";

export default function Collections() {
  const { data: collections, loading, error } = useApi('/api/collections');

  return (
    <section
      id="books"
      className="mx-auto mb-20 w-[90%] max-w-[1200px] scroll-mt-24"
    >
      <h2 className="mb-8 text-center text-3xl font-bold text-accent">
        Featured Collections
      </h2>

      {loading && <p className="text-center text-ink-light">Loading collections…</p>}
      {error && (
        <p className="text-center font-semibold text-red-700">
          Could not load collections. Please try again later.
        </p>
      )}

      <div className="grid grid-cols-1 gap-8">
        {collections.map((c) => (
          <BookCard key={c.id} collection={c} />
        ))}
      </div>
    </section>
  );
}