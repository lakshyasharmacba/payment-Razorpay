import React from "react";
import { useNavigate } from "react-router-dom";

export default function Cancel() {
  const navigate = useNavigate();

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh", fontFamily: "sans-serif" }}>
      <div style={{ background: "#ffffff", padding: "40px", borderRadius: "12px", boxShadow: "0 4px 15px rgba(0,0,0,0.1)", textAlign: "center", maxWidth: "450px" }}>
        <div style={{ fontSize: "50px", marginBottom: "15px" }}>❌</div>
        <h1 style={{ color: "#dc3545", marginBottom: "10px" }}>Payment Cancelled</h1>
        <p style={{ color: "#666", fontSize: "15px", marginBottom: "25px" }}>
          Payment process was cancelled. No charges were made.
        </p>
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={() => navigate("/")}
            style={{ flex: 1, background: "#6c757d", color: "white", padding: "12px", border: "none", borderRadius: "6px", cursor: "pointer" }}
          >
            Home
          </button>
        </div>
      </div>
    </div>
  );
}