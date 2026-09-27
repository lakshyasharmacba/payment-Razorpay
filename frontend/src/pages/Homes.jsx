import React from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";

export default function Homes() {
  const navigate = useNavigate();

  const products = [
    { id: "1", title: "Starter Workbook", price: 299 },
    { id: "2", title: "Pro Workbook 2026 Edition", price: 499 },
    { id: "3", title: "Ultimate Developer Bundle", price: 999 },
  ];

  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif", textAlign: "center" }}>
      <h1>Available Products</h1>
      <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap", marginTop: "30px" }}>
        {products.map((item) => (
          <ProductCard
            key={item.id}
            title={item.title}
            price={item.price}
            onBuyClick={() => navigate("/checkout", { state: { product: item } })}
          />
        ))}
      </div>
    </div>
  );
}