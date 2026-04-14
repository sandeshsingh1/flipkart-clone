const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../db");

const router = express.Router();

// Signup
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  const user = await pool.query(
    "INSERT INTO users (name, email, password) VALUES ($1,$2,$3) RETURNING *",
    [name, email, hashed]
  );

  res.json(user.rows[0]);
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await pool.query("SELECT * FROM users WHERE email=$1", [email]);

  if (user.rows.length === 0)
    return res.status(400).json({ msg: "User not found" });

  const valid = await bcrypt.compare(password, user.rows[0].password);

  if (!valid) return res.status(400).json({ msg: "Wrong password" });

  const token = jwt.sign({ id: user.rows[0].id }, "secret");

  res.json({ token });
});

module.exports = router;