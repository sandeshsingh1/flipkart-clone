import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const [address, setAddress] = useState("");
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    const res = await axios.get("http://localhost:5000/cart");
    setCart(res.data);
  };

  const placeOrder = async () => {
    const res = await axios.post("http://localhost:5000/orders", {
      address,
    });

    navigate(`/success/${res.data.orderId}`);
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="container">
      <h1>Checkout</h1>

      <div className="checkout-container">

        {/* LEFT SIDE */}
        <div className="checkout-left">
          <h2>Order Summary</h2>

          {cart.map((item) => (
            <div className="checkout-item" key={item.product_id}>
              <div>
                <p><b>{item.name}</b></p>
                <p>₹{item.price} × {item.quantity}</p>
              </div>

              <p><b>₹{item.price * item.quantity}</b></p>
            </div>
          ))}
        </div>

        {/* RIGHT SIDE */}
        <div className="checkout-right">
          <h3>Price Details</h3>

          <p>
            Total Items:{" "}
            {cart.reduce((acc, item) => acc + item.quantity, 0)}
          </p>

          <h2>Total: ₹{total}</h2>

          <textarea
            className="checkout-textarea"
            placeholder="Enter delivery address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <button className="checkout-btn" onClick={placeOrder}>
            Place Order
          </button>
        </div>

      </div>
    </div>
  );
}