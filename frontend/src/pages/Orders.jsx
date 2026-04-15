import { useEffect, useState } from "react";
import axios from "axios";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  // 🔥 GET TOKEN
  const token = localStorage.getItem("token");

  // 🔥 Fetch orders (WITH AUTH)
  const fetchOrders = async () => {
    try {
      const res = await axios.get("https://flipkart-clone-7idk.onrender.com/orders", {
        headers: { Authorization: `Bearer ${token}` }, // ✅ FIX
      });
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // 🔥 Cancel order (WITH AUTH)
  const cancelOrder = async (id) => {
    try {
      await axios.delete(`https://flipkart-clone-7idk.onrender.com/orders/${id}`, {
        headers: { Authorization: `Bearer ${token}` }, // ✅ FIX
      });
      fetchOrders();
    } catch (err) {
      console.error(err);
    }
  };

  // 🔥 STATUS COLOR
  const getStatusColor = (date) => {
    const orderDate = new Date(date);
    const now = new Date();
    const diffDays = (now - orderDate) / (1000 * 60 * 60 * 24);

    if (diffDays < 1) return "orange";
    if (diffDays < 3) return "blue";
    return "green";
  };

  // 🔥 STATUS TEXT
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
              <p><b>Order ID:</b> {o.id}</p>
              <p><b>Total:</b> ₹{o.total_amount}</p>
              <p><b>Address:</b> {o.address}</p>

              {/* 🔥 STATUS */}
              <p
                className="order-status"
                style={{ color: getStatusColor(o.created_at) }}
              >
                {getStatus(o.created_at)}
              </p>
            </div>

            {/* 🔥 CANCEL */}
            <button
              className="cancel-btn"
              onClick={() => cancelOrder(o.id)}
            >
              Cancel
            </button>
          </div>
          {/* 🔥 ITEMS */}
          <div className="order-items">
            {o.items?.map((item, i) => (
              <div className="order-item" key={i}>
                <img src={item.image_url} />

                <p className="item-name">{item.name}</p>
                <p className="item-qty">Qty: {item.quantity}</p>

                <div className="rating">⭐⭐⭐⭐☆</div>
              </div>
            ))}
          </div>

        </div>
      ))}
    </div>
  );
}