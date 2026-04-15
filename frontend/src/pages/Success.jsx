import { useParams, useNavigate } from "react-router-dom";

export default function Success() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f1f3f6",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "10px",
          textAlign: "center",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          width: "400px",
        }}
      >
        {/* 🎉 ICON */}
        <h1 style={{ color: "green" }}>✔</h1>

        {/* MESSAGE */}
        <h2>Order Placed Successfully 🎉</h2>
        <p style={{ marginTop: "10px" }}>
          Your order has been placed successfully.
        </p>

        {/* ORDER ID */}
        <p style={{ marginTop: "10px", fontWeight: "bold" }}>
          Order ID: #{id}
        </p>

        {/* BUTTONS */}
        <div style={{ marginTop: "20px" }}>
          <button
            onClick={() => navigate("/orders")}
            style={{
              background: "#2874f0",
              color: "white",
              padding: "10px 15px",
              border: "none",
              marginRight: "10px",
              cursor: "pointer",
            }}
          >
            View Orders
          </button>

          <button
            onClick={() => navigate("/")}
            style={{
              background: "#fb641b",
              color: "white",
              padding: "10px 15px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}