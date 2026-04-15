import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

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

  // ✅ ADD TO CART (NO AUTH)
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

  // ✅ BUY NOW
  const buyNow = async () => {
    try {
      await axios.delete("http://localhost:5000/cart/clear");

      await axios.post("http://localhost:5000/cart/add", {
        product_id: product.id,
      });

      navigate("/checkout");
    } catch (err) {
      console.error(err);
    }
  };

  return (
   <div className="product-detail">
  
  {/* LEFT IMAGE */}
  <div className="product-left">
    <img
      src={product.images?.[index]?.image_url}
      className="detail-img"
    />

    <div className="carousel-btns">
      <button onClick={() => setIndex((i) => Math.max(i - 1, 0))}>
        Prev
      </button>
      <button onClick={() =>
        setIndex((i) => Math.min(i + 1, product.images.length - 1))
      }>
        Next
      </button>
    </div>
  </div>

  {/* RIGHT INFO */}
  <div className="product-right">
    <h2>{product.name}</h2>
    <p className="desc">{product.description}</p>

    <p className="price">₹{product.price}</p>

    <p>
      {product.stock > 0 ? (
        <span className="stock">In Stock ({product.stock})</span>
      ) : (
        <span className="out">Out of Stock</span>
      )}
    </p>

    <div className="detail-buttons">
      <button className="btn-buy" onClick={buyNow}>
        Buy Now
      </button>

      <button className="btn-cart" onClick={addToCart}>
        Add to Cart
      </button>
    </div>
  </div>

</div>
  );
}