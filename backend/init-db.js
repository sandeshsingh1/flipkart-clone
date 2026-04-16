const pool = require("./db");

async function init() {
  try {
    // 🔥 DROP TABLES
    await pool.query(`DROP TABLE IF EXISTS order_items CASCADE`);
    await pool.query(`DROP TABLE IF EXISTS orders CASCADE`);
    await pool.query(`DROP TABLE IF EXISTS wishlist CASCADE`);
    await pool.query(`DROP TABLE IF EXISTS cart_items CASCADE`);
    await pool.query(`DROP TABLE IF EXISTS product_images CASCADE`);
    await pool.query(`DROP TABLE IF EXISTS products CASCADE`);
    await pool.query(`DROP TABLE IF EXISTS users CASCADE`);

    console.log("Old tables removed ✅");

    // ✅ USERS (IMPORTANT)
    await pool.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE,
        password TEXT
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

    // ✅ ORDER ITEMS (FIXED)
    await pool.query(`
      CREATE TABLE order_items (
        id SERIAL PRIMARY KEY,
        order_id INT REFERENCES orders(id) ON DELETE CASCADE,
        product_id INT REFERENCES products(id),
        quantity INT,
        price INT
      );
    `);

    console.log("Tables created ✅");

    // 🔥 SAMPLE USER (VERY IMPORTANT)
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
      ('Shoes', 2000, 'Fashion', 'Comfortable shoes');
    `);

    // 🔥 IMAGES
    await pool.query(`
      INSERT INTO product_images (product_id, image_url)
      VALUES
      (1, 'https://via.placeholder.com/150'),
      (2, 'https://via.placeholder.com/150'),
      (3, 'https://via.placeholder.com/150');
    `);

    console.log("Sample data inserted ✅");

  } catch (err) {
    console.error(err);
  } finally {
    pool.end();
  }
}

init();