const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "ecommerce",
  password: "201106",
  port: 5432,
});

module.exports = pool;