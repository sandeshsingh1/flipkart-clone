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
    <div>
      <h1>Wishlist</h1>
      {items.map((i) => (
        <div key={i.id}>
          <img src={i.image_url} width="100" />
          <p>{i.name}</p>
          <p>₹{i.price}</p>
        </div>
      ))}
    </div>
  );
}