import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const placeOrder = async () => {
    const res = await axios.post("http://localhost:5000/orders", {
      address,
    });

    navigate(`/success/${res.data.orderId}`);
  };

  return (
    <div>
      <h1>Checkout</h1>

      <textarea
        placeholder="Enter address"
        onChange={(e) => setAddress(e.target.value)}
      />

      <button onClick={placeOrder}>Place Order</button>
    </div>
  );
}