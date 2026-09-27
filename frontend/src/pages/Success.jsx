import React from "react";
import { useNavigate } from "react-router-dom";

export default function Success() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "60px 20px", textAlign: "center", fontFamily: "sans-serif" }}>
      <div style={{ maxWidth: "480px", margin: "auto", background: "#fff", padding: "30px", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
        <h1 style={{ color: "#28a745", marginBottom: "15px" }}>Payment Successful! 🎉</h1>
        <p style={{ color: "#555", fontSize: "16px", lineHeight: "1.5", marginBottom: "25px" }}>
          Thank you for your purchase! Your order has been processed via Stripe.
        </p>
        <button
          onClick={() => navigate("/")}
          style={{ background: "#007bff", color: "white", padding: "12px 24px", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "16px" }}
        >
          Back to Store
        </button>
      </div>
    </div>
  );
}