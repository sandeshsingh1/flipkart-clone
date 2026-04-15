const express = require("express");
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();
const SECRET = "mysecret"; // later move to env

// 🔥 SIGNUP
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  const user = await pool.query(
    "INSERT INTO users (email, password) VALUES ($1,$2) RETURNING id",
    [email, hashed]
  );

  res.json({ msg: "User created" });
});

// 🔥 LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await pool.query(
    "SELECT * FROM users WHERE email=$1",
    [email]
  );

  if (user.rows.length === 0)
    return res.status(400).json({ msg: "User not found" });

  const valid = await bcrypt.compare(password, user.rows[0].password);

  if (!valid)
    return res.status(400).json({ msg: "Invalid password" });

  const token = jwt.sign(
    { id: user.rows[0].id },
    SECRET
  );

  res.json({ token });
});

module.exports = router;