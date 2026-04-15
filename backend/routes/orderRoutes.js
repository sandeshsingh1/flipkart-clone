const express = require("express");
const pool = require("../db");
const { sendOrderEmail, sendCancelEmail } = require("../utils/mailer");

const router = express.Router();

// 👉 GET ORDERS
router.get("/", async (req, res) => {
  try {
    const orders = await pool.query(
      "SELECT * FROM orders ORDER BY id DESC"
    );

    res.json(orders.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error fetching orders" });
  }
});


// 👉 PLACE ORDER
router.post("/", async (req, res) => {
  const { address } = req.body;

  try {
    // 🔥 GET CART ITEMS (FIXED: user_id instead of cart_id)
    const cartItems = await pool.query(`
      SELECT ci.product_id, ci.quantity, p.price
      FROM cart_items ci
      JOIN products p ON ci.product_id = p.id
      WHERE ci.user_id = 1
    `);

    if (cartItems.rows.length === 0) {
      return res.status(400).json({ msg: "Cart empty" });
    }

    // 🔥 CALCULATE TOTAL
    let total = 0;
    cartItems.rows.forEach((item) => {
      total += item.price * item.quantity;
    });

    // 🔥 CREATE ORDER
    const order = await pool.query(
      "INSERT INTO orders (user_id, total_amount, address) VALUES (1,$1,$2) RETURNING id",
      [total, address]
    );

    const orderId = order.rows[0].id;

    // 🔥 INSERT ORDER ITEMS (FIXED: removed price column)
    for (let item of cartItems.rows) {
      await pool.query(
        "INSERT INTO order_items (order_id, product_id, quantity) VALUES ($1,$2,$3)",
        [orderId, item.product_id, item.quantity]
      );
    }

    // 🔥 CLEAR CART (FIXED)
    await pool.query("DELETE FROM cart_items WHERE user_id=1");

    // 🔥 SEND EMAIL
    try {
      console.log("📧 Sending order email...");
      await sendOrderEmail(
        "sandeshsingh9648@gmail.com",
        orderId,
        total
      );
      console.log("✅ Email sent successfully");
    } catch (err) {
      console.log("❌ Email failed:", err.message);
    }

    res.json({ msg: "Order placed", orderId });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});


// 👉 CANCEL ORDER
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // 🔥 DELETE ITEMS FIRST
    await pool.query("DELETE FROM order_items WHERE order_id=$1", [id]);

    // 🔥 DELETE ORDER
    await pool.query("DELETE FROM orders WHERE id=$1", [id]);

    // 🔥 SEND CANCEL EMAIL
    try {
      console.log("📧 Sending cancel email...");
      await sendCancelEmail("sandeshsingh9648@gmail.com", id);
      console.log("✅ Cancel email sent");
    } catch (err) {
      console.log("❌ Cancel email failed:", err.message);
    }

    res.json({ msg: "Order cancelled" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;