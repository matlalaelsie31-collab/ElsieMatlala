import { Router } from 'express';
import Stripe from 'stripe';
import pool from '../db.js';
import requireAuth from '../middleware/requireAuth.js';

const router = Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';

router.post('/', requireAuth, async (req, res) => {
  try {
    const { eventId } = req.body;
    const quantity = 1;

    if (!eventId) {
      return res.status(400).json({ error: 'eventId is required' });
    }

    // 1. real price from OUR database, never from the browser
    const { rows } = await pool.query(
      'SELECT id, title, price_cents FROM events WHERE id = $1',
      [eventId]
    );
    const event = rows[0];

    if (!event || event.price_cents <= 0) {
      return res.status(404).json({ error: 'Event not found or not for sale' });
    }

    const totalCents = event.price_cents * quantity;

    // 2. save the order as pending
    const orderResult = await pool.query(
      'INSERT INTO orders (user_id, total_cents) VALUES ($1, $2) RETURNING id',
      [req.user.id, totalCents]
    );
    const orderId = orderResult.rows[0].id;

    await pool.query(
      `INSERT INTO order_items (order_id, event_id, title, unit_price_cents, quantity)
       VALUES ($1, $2, $3, $4, $5)`,
      [orderId, event.id, event.title, event.price_cents, quantity]
    );

    // 3. start the Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          quantity,
          price_data: {
            currency: 'usd',
            unit_amount: event.price_cents,
            product_data: { name: event.title },
          },
        },
      ],
      customer_email: req.user.email,
      client_reference_id: String(orderId),
      metadata: { order_id: String(orderId) },
      success_url: `${clientUrl}/?order_id=${orderId}`,
      cancel_url: `${clientUrl}/?checkout=cancelled`,
    });

    // 4. remember which Stripe session belongs to this order
    await pool.query('UPDATE orders SET stripe_session_id = $1 WHERE id = $2', [
      session.id,
      orderId,
    ]);

    res.json({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not start checkout' });
  }
});

export default router;