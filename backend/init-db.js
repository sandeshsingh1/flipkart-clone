const pool = require("./db");

async function init() {
  try {
    // 🔥 DROP OLD TABLES (clean reset)
    await pool.query(`DROP TABLE IF EXISTS order_items CASCADE`);
    await pool.query(`DROP TABLE IF EXISTS orders CASCADE`);
    await pool.query(`DROP TABLE IF EXISTS wishlist CASCADE`);
    await pool.query(`DROP TABLE IF EXISTS cart_items CASCADE`);
    await pool.query(`DROP TABLE IF EXISTS product_images CASCADE`);
    await pool.query(`DROP TABLE IF EXISTS products CASCADE`);

    console.log("Old tables removed ✅");

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
        product_id INT REFERENCES products(id),
        image_url TEXT
      );
    `);

    // ✅ CART (with user_id)
    await pool.query(`
      CREATE TABLE cart_items (
        id SERIAL PRIMARY KEY,
        user_id INT,
        product_id INT REFERENCES products(id),
        quantity INT DEFAULT 1
      );
    `);

    // ✅ WISHLIST (with user_id)
    await pool.query(`
      CREATE TABLE wishlist (
        id SERIAL PRIMARY KEY,
        user_id INT,
        product_id INT REFERENCES products(id)
      );
    `);

    // ✅ ORDERS (with user_id)
    await pool.query(`
      CREATE TABLE orders (
        id SERIAL PRIMARY KEY,
        user_id INT,
        address TEXT,
        total_amount INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // ✅ ORDER ITEMS (with price)
    await pool.query(`
      CREATE TABLE order_items (
        id SERIAL PRIMARY KEY,
        order_id INT REFERENCES orders(id),
        product_id INT REFERENCES products(id),
        quantity INT,
        price INT
      );
    `);

    console.log("Tables created ✅");

    // 🔥 INSERT SAMPLE PRODUCTS
    await pool.query(`
      INSERT INTO products (name, price, category, description)
      VALUES 
      ('iPhone 14', 70000, 'electronics', 'Apple smartphone'),
      ('Samsung S22', 60000, 'electronics', 'Samsung flagship'),
      ('Shoes', 2000, 'fashion', 'Comfortable shoes');
    `);

    // 🔥 INSERT IMAGES
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