import { useEffect, useState } from "react";
import axios from "axios";

export default function Wishlist() {
  const [items, setItems] = useState([]);

  const fetchWishlist = async () => {
    const res = await axios.get("http://localhost:5000/wishlist");
    setItems(res.data);
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <div className="container">
  <h1>Wishlist</h1>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "20px",
    }}
  >
    {items.map((p) => (
      <div className="card" key={p.id}>
        <img src={p.image_url} className="product-img" />
        <h3>{p.name}</h3>
        <p className="price">₹{p.price}</p>
      </div>
    ))}
  </div>
</div>
  );
}