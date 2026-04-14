const express = require("express");
const pool = require("../db");

const router = express.Router();

// 👉 Get Cart Items
router.get("/", async (req, res) => {
  const result = await pool.query(`
    SELECT ci.id, p.name, p.price, ci.quantity
    FROM cart_items ci
    JOIN products p ON ci.product_id = p.id
  `);

  res.json(result.rows);
});

// 👉 Add to Cart
router.post("/add", async (req, res) => {
  const { product_id } = req.body;

  // check if already exists
  const existing = await pool.query(
    "SELECT * FROM cart_items WHERE product_id=$1",
    [product_id]
  );

  if (existing.rows.length > 0) {
    await pool.query(
      "UPDATE cart_items SET quantity = quantity + 1 WHERE product_id=$1",
      [product_id]
    );
  } else {
    await pool.query(
      "INSERT INTO cart_items (cart_id, product_id, quantity) VALUES (1,$1,1)",
      [product_id]
    );
  }

  res.json({ msg: "Added to cart" });
});

// 👉 Update Quantity
router.put("/update", async (req, res) => {
  const { id, quantity } = req.body;

  await pool.query(
    "UPDATE cart_items SET quantity=$1 WHERE id=$2",
    [quantity, id]
  );

  res.json({ msg: "Updated" });
});

// 👉 Remove Item
router.delete("/remove/:id", async (req, res) => {
  const { id } = req.params;

  await pool.query("DELETE FROM cart_items WHERE id=$1", [id]);

  res.json({ msg: "Removed" });
});
router.delete("/clear", async (req, res) => {
  await pool.query("DELETE FROM cart_items WHERE cart_id=1");
  res.json({ msg: "Cart cleared" });
});
module.exports = router;