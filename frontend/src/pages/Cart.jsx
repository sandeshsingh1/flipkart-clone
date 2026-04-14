import { useEffect, useState } from "react";
import axios from "axios";

export default function Cart() {
  const [cart, setCart] = useState([]);

  const fetchCart = async () => {
    const res = await axios.get("http://localhost:5000/cart");
    setCart(res.data);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQty = async (id, qty) => {
    await axios.put("http://localhost:5000/cart/update", {
      id,
      quantity: qty,
    });
    fetchCart();
  };

  const removeItem = async (id) => {
    await axios.delete(`http://localhost:5000/cart/remove/${id}`);
    fetchCart();
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div>
      <h1>Cart</h1>

      {cart.map((item) => (
        <div key={item.id}>
          <h3>{item.name}</h3>
          <p>₹{item.price}</p>

          <input
            type="number"
            value={item.quantity}
            onChange={(e) =>
              updateQty(item.id, e.target.value)
            }
          />

          <button onClick={() => removeItem(item.id)}>
            Remove
          </button>
        </div>
      ))}

      <h2>Total: ₹{total}</h2>
    </div>
  );
}