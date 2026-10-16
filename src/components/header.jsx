export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-surface shadow-soft">
      <div className="mx-auto flex w-[90%] max-w-[1200px] flex-col items-center gap-2 py-4 sm:flex-row sm:justify-between">
        <h1 className="text-2xl font-bold text-accent">Corner Shelf Books</h1>
        <nav aria-label="Main navigation">
          <ul className="flex flex-wrap justify-center gap-8 font-semibold">
            <li>
              <a href="#books" className="hover:text-accent">COLLECTIONS</a>
            </li>
            <li>
              <a href="#events" className="hover:text-accent">EVENTS</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}