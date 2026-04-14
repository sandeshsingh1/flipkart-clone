import { useEffect, useState } from "react";
import axios from "axios";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  // 🔥 Fetch orders from backend
  const fetchOrders = async () => {
    const res = await axios.get("http://localhost:5000/orders");
    setOrders(res.data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // 🔥 Cancel order
  const cancelOrder = async (id) => {
    await axios.delete(`http://localhost:5000/orders/${id}`);
    fetchOrders(); // refresh UI
  };
  const getStatusColor = (date) => {
    const orderDate = new Date(date);
    const now = new Date();
    const diffDays = (now - orderDate) / (1000 * 60 * 60 * 24);

    if (diffDays < 1) return "orange";
    if (diffDays < 3) return "blue";
    return "green";
  };
const getStatus = (date) => {
  const orderDate = new Date(date);
  const now = new Date();

  const diffDays = (now - orderDate) / (1000 * 60 * 60 * 24);

  if (diffDays < 1) return "🕒 Processing";
  if (diffDays < 3) return "🚚 Shipped";
  return "✔ Delivered";
};
  return (
    <div className="container">
      <h1 className="orders-title">My Orders</h1>

      {orders.map((o) => (
        <div className="order-card" key={o.id}>
          {/* 🔥 ORDER HEADER */}
          <div className="order-header">
            <div>
              <p>
                <b>Order ID:</b> {o.id}
              </p>
              <p>
                <b>Total:</b> ₹{o.total_amount}
              </p>
              <p>
                <b>Address:</b> {o.address}
              </p>
              {/* 🔥 ORDER STATUS */}
              <p
                className="order-status"
                style={{ color: getStatusColor(o.created_at) }}
              >
                {getStatus(o.created_at)}
              </p>{" "}
            </div>

            {/* 🔥 CANCEL BUTTON */}
            <button className="cancel-btn" onClick={() => cancelOrder(o.id)}>
              Cancel
            </button>
          </div>

          {/* 🔥 ORDER ITEMS */}
          <div className="order-items">
            {o.items.map((item, i) => (
              <div className="order-item" key={i}>
                {/* PRODUCT IMAGE */}
                <img src={item.image_url} />

                {/* PRODUCT NAME */}
                <p className="item-name">{item.name}</p>

                {/* QUANTITY */}
                <p className="item-qty">Qty: {item.quantity}</p>

                {/* ⭐ RATING (STATIC FOR NOW) */}
                <div className="rating">⭐⭐⭐⭐☆</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
