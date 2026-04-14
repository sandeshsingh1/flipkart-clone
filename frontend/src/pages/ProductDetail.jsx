import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    const res = await axios.get(
      `http://localhost:5000/products/${id}`
    );
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

  return (
    <div>
      <h2>{product.name}</h2>

      {product.images.map((img, i) => (
        <img key={i} src={img.image_url} width="150" />
      ))}

      <p>{product.description}</p>
      <h3>₹{product.price}</h3>

      <button>Add to Cart</button>
      <button>Buy Now</button>
      <button onClick={addToCart}>Add to Cart</button>
    </div>
  );
}