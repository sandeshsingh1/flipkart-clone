const express = require("express");
const pool = require("../db");

const router = express.Router();

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

module.exports = router;