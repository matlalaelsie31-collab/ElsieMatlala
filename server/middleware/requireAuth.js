import { fromNodeHeaders } from 'better-auth/node';
import { auth } from '../auth.js';

export default async function requireAuth(req, res, next) {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session) {
      return res.status(401).json({ error: 'Please sign in first' });
    }

    req.user = session.user;
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not check login' });
  }
}