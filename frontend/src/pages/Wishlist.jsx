// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function Wishlist() {
//   const [items, setItems] = useState([]);

//   const fetchWishlist = async () => {
//     const res = await axios.get("https://flipkart-clone-7idk.onrender.com/wishlist");
//     setItems(res.data);
//   };

//   useEffect(() => {
//     fetchWishlist();
//   }, []);

//   return (
//    <div className="container">
//   <h1>Wishlist</h1>

//   <div className="wishlist-grid">
//     {items.map((p) => (
//       <div className="card" key={p.id}>
//         <img src={p.image_url} className="product-img" />
//         <h3>{p.name}</h3>
//         <p className="price">₹{p.price}</p>

//         <button
//           className="btn-cart"
//           onClick={() => addToCart(p.id)}
//         >
//           Add to Cart
//         </button>
//       </div>
//     ))}
//   </div>
// </div>
//   );
// }
import { useEffect, useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export default function Wishlist() {
  const [items, setItems] = useState([]);

  const fetchWishlist = async () => {
    const res = await axios.get(`${API}/wishlist`);
    setItems(res.data);
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <div className="container">
      <h1>Wishlist</h1>

      <div className="wishlist-grid">
        {items.map((p) => (
          <div className="card" key={p.id}>
            <img src={p.image_url} className="product-img" />
            <h3>{p.name}</h3>
            <p className="price">₹{p.price}</p>

            <button
              className="btn-cart"
              onClick={() => addToCart(p.id)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}