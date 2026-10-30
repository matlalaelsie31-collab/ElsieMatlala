import Stripe from 'stripe';
import pool from '../db.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function stripeWebhook(req, res) {
  const signature = req.headers['stripe-signature'];
  let event;

  // 1. prove this message really came from Stripe
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature check failed:', err.message);
    return res.status(400).send('Webhook Error');
  }

  // 2. only act when a payment really completed
  try {
    if (
      event.type === 'checkout.session.completed' ||
      event.type === 'checkout.session.async_payment_succeeded'
    ) {
      const session = event.data.object;

      if (session.payment_status === 'paid') {
        await pool.query(
          `UPDATE orders
             SET status = 'paid', paid_at = now()
           WHERE id = $1 AND stripe_session_id = $2 AND status <> 'paid'`,
          [session.metadata.order_id, session.id]
        );
      }
    }

    res.json({ received: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Webhook handler failed' });
  }
}