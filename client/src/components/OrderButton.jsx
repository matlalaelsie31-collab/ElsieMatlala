import { useState } from 'react';
import { API_URL } from '../lib/api';
import { authClient } from '../lib/auth-client';

export default function OrderButton({ eventId, priceCents }) {
  const { data: session } = authClient.useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleOrder() {
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${API_URL}/api/checkout`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventId }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Could not start checkout');
      }

      window.location.href = data.url;
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }

  if (!session) {
    return (
      <a
        href="#account"
        className="inline-block w-full rounded-lg border border-[#8b4a3c] px-4 py-2 text-center text-[#8b4a3c] sm:w-auto"
      >
        Sign in to order
      </a>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        onClick={handleOrder}
        disabled={loading}
        className="w-full rounded-lg bg-[#8b4a3c] px-4 py-2 font-bold text-white disabled:opacity-60 sm:w-auto"
      >
        {loading ? 'Opening checkout...' : `Order now - $${(priceCents / 100).toFixed(2)}`}
      </button>
      {error && <p className="text-sm text-red-700">{error}</p>}
    </div>
  );
}