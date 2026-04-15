import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
const handleLogin = async () => {
  try {
    const res = await axios.post("http://localhost:5000/auth/login", {
      email,
      password,
    });

    const token = res.data.token;
    console.log("Token received:", token); // ✅ check

    if (!token) {
      alert("Backend ne token nahi bheja!");
      return;
    }

    localStorage.setItem("token", token);
    
    // ✅ Turant check karo
    const saved = localStorage.getItem("token");
    console.log("Token saved in localStorage:", saved);
    
    if (!saved) {
      alert("LocalStorage mein save nahi hua!");
      return;
    }

    alert("Login successful");
    navigate("/");

  } catch (err) {
    console.error(err);
    alert("Login failed");
  }
};
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Login</h1>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ display: "block", margin: "10px auto" }}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ display: "block", margin: "10px auto" }}
      />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}