require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function init() {
  try {
    console.log("🚀 Initializing database...");

    // 🔥 DROP TABLES (order matters)
    await pool.query(`DROP TABLE IF EXISTS order_items CASCADE`);
    await pool.query(`DROP TABLE IF EXISTS orders CASCADE`);
    await pool.query(`DROP TABLE IF EXISTS wishlist CASCADE`);
    await pool.query(`DROP TABLE IF EXISTS cart_items CASCADE`);
    await pool.query(`DROP TABLE IF EXISTS product_images CASCADE`);
    await pool.query(`DROP TABLE IF EXISTS products CASCADE`);
    await pool.query(`DROP TABLE IF EXISTS users CASCADE`);

    console.log("🗑️ Old tables removed");

    // ✅ USERS
    await pool.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password TEXT NOT NULL
      );
    `);

    // ✅ PRODUCTS
    await pool.query(`
      CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        price INT,
        category VARCHAR(100),
        description TEXT,
        stock INT DEFAULT 10
      );
    `);

    // ✅ PRODUCT IMAGES
    await pool.query(`
      CREATE TABLE product_images (
        id SERIAL PRIMARY KEY,
        product_id INT REFERENCES products(id) ON DELETE CASCADE,
        image_url TEXT
      );
    `);

    // ✅ CART
    await pool.query(`
      CREATE TABLE cart_items (
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id) ON DELETE CASCADE,
        product_id INT REFERENCES products(id) ON DELETE CASCADE,
        quantity INT DEFAULT 1
      );
    `);

    // ✅ WISHLIST
    await pool.query(`
      CREATE TABLE wishlist (
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id) ON DELETE CASCADE,
        product_id INT REFERENCES products(id) ON DELETE CASCADE
      );
    `);

    // ✅ ORDERS
    await pool.query(`
      CREATE TABLE orders (
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id) ON DELETE CASCADE,
        address TEXT,
        total_amount INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // ✅ ORDER ITEMS (IMPORTANT: includes price)
    await pool.query(`
      CREATE TABLE order_items (
        id SERIAL PRIMARY KEY,
        order_id INT REFERENCES orders(id) ON DELETE CASCADE,
        product_id INT REFERENCES products(id),
        quantity INT,
        price INT
      );
    `);

    console.log("✅ Tables created");

    // 🔥 INSERT TEST USER (id = 1 guaranteed)
    await pool.query(`
      INSERT INTO users (email, password)
      VALUES ('test@gmail.com', '123456');
    `);

    // 🔥 PRODUCTS
    await pool.query(`
      INSERT INTO products (name, price, category, description)
      VALUES 
      ('iPhone 14', 70000, 'Electronics', 'Apple smartphone'),
      ('Samsung S22', 60000, 'Electronics', 'Samsung flagship'),
      ('Nike Shoes', 3000, 'Fashion', 'Comfortable running shoes');
    `);

    // 🔥 IMAGES
    await pool.query(`
      INSERT INTO product_images (product_id, image_url)
      VALUES
      (1, 'https://via.placeholder.com/150'),
      (2, 'https://via.placeholder.com/150'),
      (3, 'https://via.placeholder.com/150');
    `);

    console.log("📦 Sample data inserted");

    console.log("🎉 DB READY SUCCESSFULLY");
  } catch (err) {
    console.error("❌ INIT ERROR:", err);
  } finally {
    await pool.end(); // only here
  }
}

init();