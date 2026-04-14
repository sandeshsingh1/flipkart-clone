import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      const res = await axios.get("http://localhost:5000/cart");
      setCart(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // 🔥 UPDATE QUANTITY
  const updateQty = async (product_id, qty) => {
    try {
      await axios.put("http://localhost:5000/cart/update", {
        product_id,
        quantity: qty,
      });
      fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  // 🔥 REMOVE ITEM
  const removeItem = async (product_id) => {
    try {
      await axios.delete(
        `http://localhost:5000/cart/remove/${product_id}`
      );
      fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  // 🔥 TOTAL
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="container">
      <h1>Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cart.map((item) => (
            <div className="cart-item" key={item.product_id}>
              <div>
                <h3>{item.name}</h3>
                <p className="price">₹{item.price}</p>
              </div>

              <div>
                {/* 🔥 QUANTITY */}
                <input
                  type="number"
                  value={item.quantity}
                  min="1"
                  onChange={(e) =>
                    updateQty(
                      item.product_id,
                      parseInt(e.target.value)
                    )
                  }
                  style={{ width: "50px" }}
                />

                {/* 🔥 REMOVE */}
                <button
                  className="btn"
                  onClick={() => removeItem(item.product_id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {/* 🔥 TOTAL + CHECKOUT */}
          <h2>Total: ₹{total}</h2>

          <button
            className="btn btn-buy"
            onClick={() => navigate("/checkout")}
          >
            Checkout
          </button>
        </>
      )}
    </div>
  );
}