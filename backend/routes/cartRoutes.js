const express = require("express");
const pool = require("../db");

const router = express.Router();

// 👉 GET CART
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT ci.product_id, p.name, p.price, ci.quantity
      FROM cart_items ci
      JOIN products p ON ci.product_id = p.id
      WHERE ci.cart_id = 1
    `);

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error fetching cart" });
  }
});

// 👉 ADD TO CART
router.post("/add", async (req, res) => {
  try {
    const { product_id } = req.body;

    const existing = await pool.query(
      "SELECT * FROM cart_items WHERE product_id=$1 AND cart_id=1",
      [product_id]
    );

    if (existing.rows.length > 0) {
      await pool.query(
        "UPDATE cart_items SET quantity = quantity + 1 WHERE product_id=$1 AND cart_id=1",
        [product_id]
      );
    } else {
      await pool.query(
        "INSERT INTO cart_items (cart_id, product_id, quantity) VALUES (1,$1,1)",
        [product_id]
      );
    }

    res.json({ msg: "Added to cart" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error adding to cart" });
  }
});

// 👉 UPDATE QUANTITY
router.put("/update", async (req, res) => {
  const { product_id, quantity } = req.body;

  await pool.query(
    "UPDATE cart_items SET quantity=$1 WHERE product_id=$2 AND cart_id=1",
    [quantity, product_id]
  );

  res.json({ msg: "Updated" });
});

// 👉 REMOVE ITEM
router.delete("/remove/:id", async (req, res) => {
  const { id } = req.params;

  await pool.query(
    "DELETE FROM cart_items WHERE product_id=$1 AND cart_id=1",
    [id]
  );

  res.json({ msg: "Removed" });
});

// 👉 CLEAR CART
router.delete("/clear", async (req, res) => {
  await pool.query("DELETE FROM cart_items WHERE cart_id=1");
  res.json({ msg: "Cart cleared" });
});

module.exports = router;