import { Link } from "react-router-dom";

export default function Navbar() {
  return (
   <div className="navbar">
  <h3>Flipkart</h3>
  <div className="nav-links">
    <Link to="/">Home</Link>
    <Link to="/cart">Cart</Link>
    <Link to="/wishlist">Wishlist</Link>
    <Link to="/orders">Orders</Link>
  </div>
</div>
  );
}
