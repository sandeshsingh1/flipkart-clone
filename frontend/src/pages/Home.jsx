import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // 🔥 GET TOKEN (for auth)
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchProducts();
  }, [location]);

  // 🔥 FETCH ALL PRODUCTS (NO AUTH NEEDED)
  const fetchProducts = async () => {
    try {
      const res = await axios.get("https://flipkart-clone-7idk.onrender.com/products");
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔍 SEARCH
  const handleSearch = async () => {
    try {
      if (search.trim() === "") {
        fetchProducts();
        return;
      }

      const res = await axios.get(
        `https://flipkart-clone-7idk.onrender.com/products?search=${search}`,
      );
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // 🏷️ FILTER
  const handleCategory = async (category) => {
    try {
      if (category === "") {
        fetchProducts();
      } else {
        const res = await axios.get(
          `https://flipkart-clone-7idk.onrender.com/products?category=${category}`,
        );
        setProducts(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ background: "#f1f3f6", minHeight: "100vh" }}>
      <h1 style={{ textAlign: "center" }}>Flipkart Clone</h1>

      {/* 🔍 SEARCH + FILTER */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <input
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: "8px", width: "200px" }}
        />

        <button onClick={handleSearch} style={{ marginLeft: "10px" }}>
          Search
        </button>

        <button onClick={fetchProducts} style={{ marginLeft: "10px" }}>
          Show All
        </button>

        <select
          onChange={(e) => handleCategory(e.target.value)}
          style={{ marginLeft: "10px", padding: "8px" }}
        >
          <option value="">All</option>
          <option value="Electronics">Electronics</option>
          <option value="Fashion">Fashion</option>
        </select>
      </div>

      {/* 🧱 PRODUCT GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
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
              padding: "15px",
              borderRadius: "8px",
              background: "white",
              cursor: "pointer",
              textAlign: "center",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            {/* 📷 IMAGE */}
            <img
              src={p.image_url}
              onError={(e) => {
                e.target.src =
                  "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9";
              }}
              style={{
                width: "100%",
                height: "150px",
                objectFit: "contain",
              }}
            />

            {/* 🏷️ DETAILS */}
            <h3 style={{ fontSize: "16px" }}>{p.name}</h3>
            <p style={{ color: "green", fontWeight: "bold" }}>₹{p.price}</p>

            {/* 🛒 BUTTONS */}
            <div style={{ marginTop: "10px" }}>
              {/* 🔥 ADD TO CART (WITH AUTH) */}
              <button
                onClick={async (e) => {
                  e.stopPropagation();

                  try {
                    await axios.post(
                      "https://flipkart-clone-7idk.onrender.com/cart/add",
                      { product_id: p.id },
                      {
                        headers: { Authorization: `Bearer ${token}` },
                      },
                    );

                    alert("Added to cart ✅");
                  } catch (err) {
                    console.error(err);
                    alert("Error adding to cart ❌");
                  }
                }}
              >
                Add to Cart
              </button>

              {/* 🔥 WISHLIST (WITH AUTH) */}
              <button
                onClick={(e) => {
                  e.stopPropagation();

                  axios.post(
                    "https://flipkart-clone-7idk.onrender.com/wishlist/add",
                    { product_id: p.id },
                    {
                      headers: { Authorization: `Bearer ${token}` }, // ✅ AUTH
                    },
                  );

                  alert("Added to wishlist");
                }}
                style={{
                  background: "#fb641b",
                  color: "white",
                  border: "none",
                  padding: "6px 10px",
                  cursor: "pointer",
                }}
              >
                ❤️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
