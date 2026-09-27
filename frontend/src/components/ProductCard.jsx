import React from "react";

export default function ProductCard({ title, price, onBuyClick }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "25px",
        borderRadius: "10px",
        width: "220px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      }}
    >
      <h3>{title}</h3>
      <p style={{ fontSize: "18px", fontWeight: "bold" }}>₹{price}</p>
      <button
        onClick={onBuyClick}
        style={{
          background: "#28a745",
          color: "white",
          padding: "10px 18px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "15px",
        }}
      >
        Buy Now
      </button>
    </div>
  );
}