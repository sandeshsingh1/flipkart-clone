const express = require("express");
const pool = require("../db");
const router = express.Router();

// Get wishlist
router.get("/", async (req, res) => {
  const result = await pool.query(`
    SELECT w.id, p.name, p.price, pi.image_url
    FROM wishlist w
    JOIN products p ON w.product_id = p.id
    LEFT JOIN product_images pi ON p.id = pi.product_id
    WHERE w.user_id = 1
  `);
  res.json(result.rows);
});

// Add
router.post("/add", async (req, res) => {
  const { product_id } = req.body;

  // avoid duplicates
  const exists = await pool.query(
    "SELECT * FROM wishlist WHERE user_id=1 AND product_id=$1",
    [product_id]
  );

  if (exists.rows.length === 0) {
    await pool.query(
      "INSERT INTO wishlist (user_id, product_id) VALUES (1,$1)",
      [product_id]
    );
  }

  res.json({ msg: "Added to wishlist" });
});

// Remove
router.delete("/remove/:id", async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM wishlist WHERE id=$1", [id]);
  res.json({ msg: "Removed" });
});

module.exports = router;