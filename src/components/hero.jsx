export default function Hero() {
  return (
    <section className="mx-auto mb-20 mt-8 w-[90%] max-w-[1200px] overflow-hidden rounded-2xl bg-surface shadow-lift">
      <img
        src="public/images/bookhero.jpg"
        alt="Inside Corner Shelf Books"
        className="h-[220px] w-full object-cover sm:h-[300px] md:h-[500px]"
      />
      <div className="p-4 text-center sm:p-8">
        <h2 className="mb-4 text-3xl font-bold text-accent">
          Discover Stories That Stay With You
        </h2>
        <p className="mx-auto max-w-2xl text-ink-light">
          Corner Shelf Books is an independent bookstore dedicated to bringing
          readers together through carefully curated fiction, nonfiction, staff
          recommendations, and engaging community events.
        </p>
      </div>
    </section>
  );
}