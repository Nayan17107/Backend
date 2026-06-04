import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  timeout: 20000
});

export const searchProducts = async (query) => {
  const { data } = await api.get("/search", { params: { query } });
  return data;
};

export const getHistory = async () => {
  const { data } = await api.get("/history");
  return data;  
};

export const getPriceHistoryChart = async (query, days = 90) => {
  const { data } = await api.get("/history/chart", { params: { query, days } });
  return data;
};

export const getFavorites = async () => {
  const { data } = await api.get("/favorites");
  return data;
};

export const saveFavorite = async (product) => {
  const { data } = await api.post("/favorites", product);
  return data;
};

export const removeFavorite = async (id) => {
  const { data } = await api.delete(`/favorites/${id}`);
  return data;
};

export default api;
