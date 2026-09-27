import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const createOrder = async (productId) => {
  const response = await API.post("/create-order", { productId });
  return response.data;
};

export const checkOrderStatus = async (orderId) => {
  const response = await API.get(`/order-status/${orderId}`);
  return response.data;
};