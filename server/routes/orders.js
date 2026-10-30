import { Router } from 'express';
import pool from '../db.js';
import requireAuth from '../middleware/requireAuth.js';

const router = Router();

router.get('/:id', requireAuth, async (req, res) => {
  try {
    const orderId = Number.parseInt(req.params.id, 10);

    if (!Number.isInteger(orderId)) {
      return res.status(400).json({ error: 'Invalid order id' });
    }

    // only the owner can see their order
    const orderResult = await pool.query(
      `SELECT id, status, total_cents, currency, created_at, paid_at
         FROM orders
        WHERE id = $1 AND user_id = $2`,
      [orderId, req.user.id]
    );
    const order = orderResult.rows[0];

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const itemsResult = await pool.query(
      `SELECT event_id, title, unit_price_cents, quantity
         FROM order_items
        WHERE order_id = $1`,
      [orderId]
    );

    res.json({ ...order, items: itemsResult.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not load order' });
  }
});

export default router;