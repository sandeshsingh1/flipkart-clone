const pool = require("./db");

async function init() {
  try {
    // 1. Create tables
    await pool.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        price INT,
        category VARCHAR(100)
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS cart_items (
        id SERIAL PRIMARY KEY,
        cart_id INT,
        product_id INT REFERENCES products(id),
        quantity INT DEFAULT 1
      );
    `);

    console.log("Tables created ✅");

    // 2. Insert sample products
    await pool.query(`
      INSERT INTO products (name, price, category)
      VALUES 
      ('iPhone 14', 70000, 'electronics'),
      ('Samsung S22', 60000, 'electronics'),
      ('Shoes', 2000, 'fashion')
      RETURNING *;
    `);

    console.log("Sample products inserted ✅");

  } catch (err) {
    console.error(err);
  } finally {
    pool.end();
  }
}

init();