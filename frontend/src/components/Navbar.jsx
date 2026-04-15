import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate(); // ✅ FIX

  return (
    <div className="navbar">
      <h3>Flipkart</h3>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/wishlist">Wishlist</Link>
        <Link to="/orders">Orders</Link>

        {/* 🔥 LOGIN BUTTON */}
        {/* <button onClick={() => navigate("/login")}>
          Login
        </button> */}
      </div>
    </div>
  );
}