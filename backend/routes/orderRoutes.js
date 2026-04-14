const express = require("express");
const pool = require("../db");

const router = express.Router();

// 👉 Get Orders
router.get("/", async (req, res) => {
  const orders = await pool.query(
    "SELECT * FROM orders WHERE user_id=1 ORDER BY id DESC"
  );
  res.json(orders.rows);
});
// 👉 Place Order
router.post("/", async (req, res) => {
  const { address } = req.body;

  try {
    // 1. Get cart items
    const cartItems = await pool.query(`
      SELECT ci.product_id, ci.quantity, p.price, p.stock
      FROM cart_items ci
      JOIN products p ON ci.product_id = p.id
      WHERE ci.cart_id = 1
    `);

    if (cartItems.rows.length === 0) {
      return res.status(400).json({ msg: "Cart is empty" });
    }

    // 🔥 2. Check stock availability
    for (let item of cartItems.rows) {
      if (item.stock < item.quantity) {
        return res.status(400).json({
          msg: `Not enough stock for product ${item.product_id}`,
        });
      }
    }

    // 3. Calculate total
    let total = 0;
    cartItems.rows.forEach((item) => {
      total += item.price * item.quantity;
    });

    // 4. Create order
    const order = await pool.query(
      "INSERT INTO orders (user_id, total_amount, address) VALUES (1,$1,$2) RETURNING id",
      [total, address]
    );

    const orderId = order.rows[0].id;

    // 5. Insert order items + reduce stock
    for (let item of cartItems.rows) {
      // insert order item
      await pool.query(
        "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1,$2,$3,$4)",
        [orderId, item.product_id, item.quantity, item.price]
      );

      // 🔥 reduce stock
      await pool.query(
        "UPDATE products SET stock = stock - $1 WHERE id = $2",
        [item.quantity, item.product_id]
      );
    }

    // 6. Clear cart
    await pool.query("DELETE FROM cart_items WHERE cart_id = 1");

    res.json({ msg: "Order placed", orderId });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;