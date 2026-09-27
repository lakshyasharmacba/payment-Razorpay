import React from "react";

export default function PrimaryButton({ children, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        width: "100%",
        background: "#6772e5",
        color: "white",
        padding: "12px",
        border: "none",
        borderRadius: "5px",
        cursor: disabled ? "not-allowed" : "pointer",
        fontSize: "16px",
        fontWeight: "bold",
        opacity: disabled ? 0.7 : 1,
      }}
    >
      {children}
    </button>
  );
}