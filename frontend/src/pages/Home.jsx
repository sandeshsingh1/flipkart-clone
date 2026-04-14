import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate(); // ✅ FIXED (inside component)

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/products");
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/products?search=${search}`,
      );
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Flipkart Clone</h1>

      <input
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <div
        style={{
          background: "#f1f3f6",
          minHeight: "100vh",
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: "20px",
          padding: "20px",
        }}
      >
        {products.map((p) => (
          <div
            key={p.id}
            onClick={() => navigate(`/product/${p.id}`)}
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              borderRadius: "8px",
              cursor: "pointer",
              background: "white",
              textAlign: "center",
            }}
          >
            <img
              src={p.image_url || "https://via.placeholder.com/150"}
              alt=""
              width="100%"
              height="150"
            />
            <h3 style={{ fontSize: "16px" }}>{p.name}</h3>
            <p style={{ color: "green", fontWeight: "bold" }}>₹{p.price}</p>
            <button
              onClick={(e) => {
                e.stopPropagation(); // IMPORTANT (prevents navigation)
                axios.post("http://localhost:5000/cart/add", {
                  product_id: p.id,
                });
                alert("Added to cart");
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
