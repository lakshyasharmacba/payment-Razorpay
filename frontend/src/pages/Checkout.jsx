import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createOrder, checkOrderStatus } from "../services/api";
import PrimaryButton from "../components/PrimaryButton";
import Loader from "../components/Loader";

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState("");

  if (!product) {
    return (
      <div style={{ textAlign: "center", padding: "50px", fontFamily: "sans-serif" }}>
        <h2>No product selected.</h2>
        <button onClick={() => navigate("/")} style={{ padding: "10px 20px", cursor: "pointer" }}>
          Go to Store
        </button>
      </div>
    );
  }

  const pollOrderStatus = (orderId) => {
    setVerifying(true);
    let attempts = 0;
    const maxAttempts = 15;

    const interval = setInterval(async () => {
      attempts++;
      try {
        const result = await checkOrderStatus(orderId);

        if (result.status === "paid") {
          clearInterval(interval);
          navigate("/success");
        } else if (result.status === "failed") {
          clearInterval(interval);
          navigate("/cancel");
        } else if (attempts >= maxAttempts) {
          clearInterval(interval);
          setVerifying(false);
          setError("Verification is taking longer than expected.");
        }
      } catch (err) {
        if (attempts >= maxAttempts) {
          clearInterval(interval);
          setVerifying(false);
          setError("Could not verify payment status.");
        }
      }
    }, 1500);
  };

  const handlePayment = async () => {
    setLoading(true);
    setError("");

    try {
      const orderData = await createOrder(product.id);

      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Your Store Name",
        description: orderData.productName,
        order_id: orderData.orderId,
        handler: function () {
          setLoading(false);
          pollOrderStatus(orderData.orderId);
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },
        theme: { color: "#6772e5" },
      };

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
    } catch (err) {
      setError(err.response?.data?.error || "Payment initiation failed.");
      setLoading(false);
    }
  };
  return (
    <div style={{ padding: "40px", maxWidth: "450px", margin: "40px auto", fontFamily: "sans-serif" }}>
      <h2>Checkout Summary</h2>
      <div style={{ background: "#f9f9f9", padding: "20px", borderRadius: "8px", marginBottom: "20px" }}>
        <p><strong>Item:</strong> {product.title}</p>
        <p><strong>Total Amount:</strong> ₹{product.price}</p>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {verifying ? (
        <Loader message="Verifying your payment..." />
      ) : (
        <PrimaryButton onClick={handlePayment} disabled={loading}>
          {loading ? "Opening Razorpay..." : "Proceed to Payment"}
        </PrimaryButton>
      )}
    </div>
  );
}