import { useEffect, useState } from "react";
import axios from "axios";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const res = await axios.get("http://localhost:5000/orders");
    setOrders(res.data);
  };

  return (
   <div className="container">
  <h1>My Orders</h1>

  {orders.map((o) => (
    <div className="order-box" key={o.id}>
      <p><b>Order ID:</b> {o.id}</p>
      <p><b>Total:</b> ₹{o.total_amount}</p>
      <p><b>Address:</b> {o.address}</p>
    </div>
  ))}
</div>
  );
}