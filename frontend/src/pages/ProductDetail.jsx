import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    const res = await axios.get(`http://localhost:5000/products/${id}`);
    setProduct(res.data);
  };

  if (!product) return <p>Loading...</p>;
  const addToCart = async () => {
    try {
      await axios.post("http://localhost:5000/cart/add", {
        product_id: product.id,
      });
      alert("Added to cart");
    } catch (err) {
      console.error(err);
    }
  };
  const buyNow = async () => {
    try {
      // 1. Clear cart first (optional but better)
      await axios.delete("http://localhost:5000/cart/clear");

      // 2. Add this product to cart
      await axios.post("http://localhost:5000/cart/add", {
        product_id: product.id,
      });

      // 3. Go to checkout
      navigate("/checkout");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>{product.name}</h2>

      {/* 🔥 CAROUSEL */}
      <img
        src={product.images?.[index]?.image_url}
        style={{
          width: "300px",
          height: "300px",
          objectFit: "contain",
        }}
      />

      <div style={{ marginTop: "10px" }}>
        <button onClick={() => setIndex((i) => Math.max(i - 1, 0))}>
          Prev
        </button>

        <button
          onClick={() =>
            setIndex((i) => Math.min(i + 1, product.images.length - 1))
          }
        >
          Next
        </button>
      </div>

      {/* 🔥 DETAILS */}
      {/* 📝 DESCRIPTION */}
      <p style={{ marginTop: "10px", color: "#555" }}>{product.description}</p>

      {/* 📦 STOCK INFO */}
      <p style={{ fontWeight: "bold", marginTop: "10px" }}>
        {product.stock > 0 ? (
          <span style={{ color: "green" }}>
            In Stock ({product.stock} available)
          </span>
        ) : (
          <span style={{ color: "red" }}>Out of Stock</span>
        )}
      </p>

      {/* 🔥 LOW STOCK WARNING */}
      {product.stock > 0 && product.stock <= 5 && (
        <p style={{ color: "red", fontSize: "14px" }}>
          Hurry! Only {product.stock} left
        </p>
      )}

      {/* 🔥 BUTTONS */}
      <div style={{ marginTop: "15px" }}>
        <button
          onClick={buyNow}
          style={{
            background: "#fb641b",
            color: "white",
            padding: "10px",
            marginRight: "10px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Buy Now
        </button>

        <button
          onClick={addToCart}
          style={{
            background: "#ff9f00",
            color: "white",
            padding: "10px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
