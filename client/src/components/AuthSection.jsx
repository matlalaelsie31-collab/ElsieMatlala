import { useState } from 'react';
import { authClient } from '../lib/auth-client';

export default function AuthSection() {
  const { data: session, isPending } = authClient.useSession();

  const [mode, setMode] = useState('signin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const isSignUp = mode === 'signup';

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = isSignUp
      ? await authClient.signUp.email({ name, email, password })
      : await authClient.signIn.email({ email, password });

    setLoading(false);

    if (result.error) {
      setError(result.error.message || 'Something went wrong');
      return;
    }
    setPassword('');
  }

  const inputClass =
    'w-full rounded-lg border border-line bg-white px-3 py-2 focus:border-accent focus:outline-none';

  return (
    <section
      id="account"
      className="mx-auto mb-20 w-[90%] max-w-[600px] scroll-mt-24 rounded-2xl bg-surface p-6 shadow-soft sm:p-8"
    >
      <h2 className="mb-6 text-center text-3xl font-bold text-accent">
        {session ? 'Your account' : isSignUp ? 'Create an account' : 'Sign in'}
      </h2>

      {isPending ? (
        <p className="text-center text-ink-light">Checking your session…</p>
      ) : session ? (
        <div className="text-center">
          <p className="mb-4">
            You are signed in as <b>{session.user.name}</b> ({session.user.email}).
          </p>
          <button
            type="button"
            onClick={() => authClient.signOut()}
            className="rounded-full bg-accent px-6 py-2 font-semibold text-white hover:bg-accent-dark"
          >
            Sign out
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {isSignUp && (
            <label className="flex flex-col gap-1 font-semibold">
              Name
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className={inputClass}
              />
            </label>
          )}
          <label className="flex flex-col gap-1 font-semibold">
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={inputClass}
            />
          </label>
          <label className="flex flex-col gap-1 font-semibold">
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              className={inputClass}
            />
            {isSignUp && (
              <span className="text-sm font-normal text-ink-light">At least 8 characters</span>
            )}
          </label>

          {error && <p className="text-sm font-semibold text-red-700">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="rounded-full bg-accent px-6 py-2 font-semibold text-white hover:bg-accent-dark disabled:opacity-60"
          >
            {loading ? 'Please wait…' : isSignUp ? 'Sign up' : 'Sign in'}
          </button>

          <button
            type="button"
            onClick={() => {
              setMode(isSignUp ? 'signin' : 'signup');
              setError('');
            }}
            className="text-sm text-accent underline"
          >
            {isSignUp ? 'Already have an account? Sign in' : "No account yet? Sign up"}
          </button>
        </form>
      )}
    </section>
  );
}