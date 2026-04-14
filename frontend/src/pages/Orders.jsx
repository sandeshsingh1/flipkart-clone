import { useEffect, useState } from "react";
import axios from "axios";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/orders").then(res => {
      setOrders(res.data);
    });
  }, []);

  return (
    <div>
      <h1>My Orders</h1>
      {orders.map(o => (
        <div key={o.id}>
          <p>Order ID: {o.id}</p>
          <p>Total: ₹{o.total_amount}</p>
          <p>{o.address}</p>
        </div>
      ))}
    </div>
  );
}