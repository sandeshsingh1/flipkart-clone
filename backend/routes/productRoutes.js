const express = require("express");
const pool = require("../db");

const router = express.Router();

// ✅ GET all products (search + filter)
router.get("/", async (req, res) => {
  const { search, category } = req.query;

  let query = `
    SELECT DISTINCT ON (p.id) p.*, pi.image_url
    FROM products p
    LEFT JOIN product_images pi ON p.id = pi.product_id
    WHERE 1=1
  `;

  let values = [];

  if (search) {
    values.push(`%${search}%`);
    query += ` AND p.name ILIKE $${values.length}`;
  }

  if (category) {
    values.push(category);
    query += ` AND p.category = $${values.length}`;
  }

  const result = await pool.query(query, values);
  res.json(result.rows);
});


// ✅ GET product by ID (IMPORTANT)
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const product = await pool.query(
    "SELECT * FROM products WHERE id=$1",
    [id]
  );

  const images = await pool.query(
    "SELECT image_url FROM product_images WHERE product_id=$1",
    [id]
  );

  if (product.rows.length === 0) {
    return res.status(404).json({ msg: "Product not found" });
  }

  res.json({
    ...product.rows[0],
    images: images.rows,
  });
});

module.exports = router;