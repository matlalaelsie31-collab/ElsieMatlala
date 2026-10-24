import { authClient } from '../lib/auth-client';

export default function Header() {
  const { data: session } = authClient.useSession();

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-surface shadow-soft">
      <div className="mx-auto flex w-[90%] max-w-[1200px] flex-col items-center gap-2 py-4 sm:flex-row sm:justify-between">
        <h1 className="text-2xl font-bold text-accent">Corner Shelf Books</h1>
        <nav aria-label="Main navigation">
          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 font-semibold">
            <li>
              <a href="#books" className="hover:text-accent">COLLECTIONS</a>
            </li>
            <li>
              <a href="#events" className="hover:text-accent">EVENTS</a>
            </li>
            {session && (
              <li className="font-normal text-ink-light">Hi, {session.user.name}</li>
            )}
            <li>
              {session ? (
                <button
                  type="button"
                  onClick={() => authClient.signOut()}
                  className="font-semibold hover:text-accent"
                >
                  SIGN OUT
                </button>
              ) : (
                <a href="#account" className="hover:text-accent">SIGN IN</a>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}