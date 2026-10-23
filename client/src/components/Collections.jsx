import { collections } from '../data/items';
import BookCard from './BookCard';

export default function Collections() {
  return (
    <section
      id="books"
      className="mx-auto mb-20 w-[90%] max-w-[1200px] scroll-mt-24"
    >
      <h2 className="mb-8 text-center text-3xl font-bold text-accent">
        Featured Collections
      </h2>
      <div className="grid grid-cols-1 gap-8">
        {collections.map((c) => (
          <BookCard key={c.id} collection={c} />
        ))}
      </div>
    </section>
  );
}