require("dotenv").config();
const express = require("express");
const cors = require("cors");
const Razorpay = require("razorpay");
const crypto = require("crypto");

const app = express();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

app.use(cors({ origin: process.env.FRONTEND_URL }));

const orderStatus = {};

app.post(
  "/api/webhooks/razorpay",
  express.raw({ type: "application/json" }),
  (req, res) => {
    const webhookSignature = req.headers["x-razorpay-signature"];

    try {
      const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET)
        .update(req.body)
        .digest("hex");

      if (expectedSignature !== webhookSignature) {
        console.error("Webhook Verification Failed: Signature mismatch");
        return res.status(400).json({ error: "Invalid signature" });
      }

      const event = JSON.parse(req.body);

      if (event.event === "payment.captured") {
        const payment = event.payload.payment.entity;
        orderStatus[payment.order_id] = "paid";
        console.log("✅ Payment Successful! Order:", payment.order_id);
      }

      if (event.event === "payment.failed") {
        const payment = event.payload.payment.entity;
        orderStatus[payment.order_id] = "failed";
        console.log("❌ Payment Failed —", payment.id);
      }

      res.json({ status: "ok" });
    } catch (error) {
      console.error("Webhook Error:", error.message);
      res.status(400).json({ error: "Webhook processing failed" });
    }
  }
);

app.use(express.json());

const PRODUCTS = {
  "1": { name: "Starter Workbook", price: 299 },
  "2": { name: "Pro Workbook 2026 Edition", price: 499 },
  "3": { name: "Ultimate Developer Bundle", price: 999 },
};

app.post("/api/create-order", async (req, res) => {
  try {
    const { productId } = req.body;
    const product = PRODUCTS[productId];

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const order = await razorpay.orders.create({
      amount: product.price * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: { productId, productName: product.name },
    });

    orderStatus[order.id] = "created";

    res.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      productName: product.name,
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("Error creating order:", error.message);
    res.status(500).json({ error: "Failed to create order" });
  }
});

app.get("/api/order-status/:orderId", (req, res) => {
  const status = orderStatus[req.params.orderId] || "pending";
  res.json({ status });
});

app.get("/", (req, res) => res.send("Razorpay Server Running"));

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server listening on port ${process.env.PORT || 5000}`);
});