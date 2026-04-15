# 🛒 Flipkart Clone (MERN Stack)

A full-stack e-commerce web application inspired by Flipkart.
Users can browse products, add items to cart, place orders, and manage wishlist.

---

## 🚀 Features

* 🏠 Home page with product listing
* 🔍 Search & filter products
* 📦 Product detail page with image carousel
* 🛒 Add to Cart / Remove / Update quantity
* ⚡ Buy Now (single product purchase)
* 💳 Checkout system
* 📦 Order placement & history
* ❤️ Wishlist functionality
* 📧 Email notification on order placement
* 🎨 Clean UI (Flipkart-style)

---

## 🧑‍💻 Tech Stack

### Frontend

* React.js
* Axios
* React Router DOM
* CSS

### Backend

* Node.js
* Express.js
* PostgreSQL

### Other

* Nodemailer (Email service)

---

## 📂 Project Structure

```
flipkart-clone/
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── index.css
│
├── backend/
│   ├── routes/
│   ├── db.js
│   ├── server.js
│   └── utils/mailer.js
│
└── README.md
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/flipkart-clone.git
cd flipkart-clone
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Run server:

```bash
node server.js
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🗄️ Database Setup (PostgreSQL)

### Tables Required:

* users
* products
* product_images
* cart_items
* orders
* order_items
* wishlist

---

## 📧 Email Setup

Inside `utils/mailer.js`:

```js
auth: {
  user: "your_email@gmail.com",
  pass: "your_app_password"
}
```

👉 Use **Gmail App Password**, not your actual password.

---

## 🔥 API Endpoints

### Products

* GET `/products`
* GET `/products/:id`

### Cart

* GET `/cart`
* POST `/cart/add`
* PUT `/cart/update`
* DELETE `/cart/remove/:id`
* DELETE `/cart/clear`

### Orders

* GET `/orders`
* POST `/orders`
* DELETE `/orders/:id`

### Wishlist

* GET `/wishlist`
* POST `/wishlist/add`

---

## 🎯 Future Improvements

* 🔐 Authentication (JWT login/signup)
* 💳 Payment integration (Razorpay/Stripe)
* ⭐ Product ratings & reviews
* 📦 Order tracking system
* 📱 Fully responsive UI

---

## 👨‍💻 Author

**Sandesh Singh**

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!
