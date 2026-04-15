// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function Cart() {
//   const [cart, setCart] = useState([]);
//   const navigate = useNavigate();

//   const fetchCart = async () => {
//     const res = await axios.get("https://flipkart-clone-7idk.onrender.com/cart");
//     setCart(res.data);
//   };

//   useEffect(() => {
//     fetchCart();
//   }, []);

//   const updateQty = async (product_id, qty) => {
//     await axios.put("https://flipkart-clone-7idk.onrender.com/cart/update", {
//       product_id,
//       quantity: qty,
//     });
//     fetchCart();
//   };

//   const removeItem = async (product_id) => {
//     await axios.delete(
//       `https://flipkart-clone-7idk.onrender.com/cart/remove/${product_id}`
//     );
//     fetchCart();
//   };

//   const total = cart.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   );
// const buySingleItem = async (item) => {
//   try {
//     // 1. Clear cart
//     await axios.delete("https://flipkart-clone-7idk.onrender.com/cart/clear");

//     // 2. Add only this product
//     await axios.post("https://flipkart-clone-7idk.onrender.com/cart/add", {
//       product_id: item.product_id,
//       quantity: item.quantity,
//     });

//     // 3. Go to checkout
//     navigate("/checkout");
//   } catch (err) {
//     console.error(err);
//   }
// };
//   return (
//     <div className="container">
//   <h1>Cart</h1>

//   {cart.length === 0 ? (
//     <p>Your cart is empty</p>
//   ) : (
//     <>
//       {cart.map((item) => (
//         <div className="cart-item" key={item.product_id}>
//   <div>
//     <h3>{item.name}</h3>
//     <p className="price">₹{item.price}</p>
//   </div>

//   <div>
//     {/* QUANTITY */}
//     <input
//       type="number"
//       value={item.quantity}
//       min="1"
//       onChange={(e) =>
//         updateQty(item.product_id, parseInt(e.target.value))
//       }
//       style={{ width: "60px", marginRight: "10px" }}
//     />

//     {/* REMOVE */}
//     <button
//       className="btn"
//       onClick={() => removeItem(item.product_id)}
//     >
//       Remove
//     </button>

//     {/* 🔥 BUY SINGLE */}
//     <button
//       className="btn btn-buy"
//       onClick={() => buySingleItem(item)}
//     >
//       Buy Now
//     </button>
//   </div>
// </div>
//       ))}

//       <div className="cart-summary">
//         <h2>Total: ₹{total}</h2>
//         <button className="btn-buy" onClick={() => navigate("/checkout")}>
//           Checkout
//         </button>
//       </div>
//     </>
//   )}
// </div>
//   );
// }
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

export default function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      const res = await axios.get(`${API}/cart`);
      setCart(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQty = async (product_id, qty) => {
    await axios.put(`${API}/cart/update`, {
      product_id,
      quantity: qty,
    });
    fetchCart();
  };

  const removeItem = async (product_id) => {
    await axios.delete(`${API}/cart/remove/${product_id}`);
    fetchCart();
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const buySingleItem = async (item) => {
    try {
      await axios.delete(`${API}/cart/clear`);

      await axios.post(`${API}/cart/add`, {
        product_id: item.product_id,
      });

      navigate("/checkout");
    } catch (err) {
      console.error(err);
    }
  };

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
                <input
                  type="number"
                  value={item.quantity}
                  min="1"
                  onChange={(e) =>
                    updateQty(
                      item.product_id,
                      Math.max(1, Number(e.target.value))
                    )
                  }
                  style={{ width: "60px", marginRight: "10px" }}
                />

                <button
                  className="btn"
                  onClick={() => removeItem(item.product_id)}
                >
                  Remove
                </button>

                <button
                  className="btn btn-buy"
                  onClick={() => buySingleItem(item)}
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))}

          <div className="cart-summary">
            <h2>Total: ₹{total}</h2>
            <button
              className="btn-buy"
              onClick={() => navigate("/checkout")}
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}