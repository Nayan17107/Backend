import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
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
