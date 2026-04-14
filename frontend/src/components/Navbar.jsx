import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        background: "#2874f0",
        padding: "10px 20px",
        color: "white",
      }}
    >
      <h2>Flipkart</h2>
      <div>
        <Link to="/" style={{ color: "white", marginRight: "15px" }}>
          Home
        </Link>
        <Link to="/cart" style={{ color: "white" }}>
          Cart
        </Link>
        <Link to="/wishlist" style={{ color: "white", marginLeft: "15px" }}>
          Wishlist
        </Link>
      </div>
    </div>
  );
}
