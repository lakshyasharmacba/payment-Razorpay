import React from "react";

export default function Loader({ message }) {
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <p style={{ fontSize: "16px", color: "#555" }}>{message}</p>
    </div>
  );
}