export default function BookCard({ collection }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl bg-surface shadow-soft md:flex-row md:gap-8">
      <img
        src={collection.image}
        alt={collection.alt}
        className="h-[250px] w-full object-cover md:w-[350px] md:shrink-0"
      />
      <div className="p-4 sm:p-6">
        <h3 className="mb-2 text-xl font-bold text-accent">{collection.title}</h3>
        <p>{collection.description}</p>
      </div>
    </article>
  );
}