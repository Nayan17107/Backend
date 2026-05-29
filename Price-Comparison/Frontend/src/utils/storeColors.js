const storeColors = {
  amazon: "#f59e0b",
  flipkart: "#2f80ff",
  croma: "#00d46a",
  myntra: "#ff4f8b",
  cashify: "#14b8a6",
  "reliance digital": "#38bdf8",
  "vijay sales": "#fb7185",
  "tata cliq": "#f97316",
  "google shopping": "#16c7f3",
};

const storeLabels = {
  amazon: "Amazon",
  flipkart: "Flipkart",
  croma: "Croma",
  myntra: "Myntra",
  cashify: "Cashify",
  "reliance digital": "Reliance Digital",
  "vijay sales": "Vijay Sales",
  "tata cliq": "Tata CLiQ",
  "google shopping": "Google Shopping",
};

const storeInitials = {
  amazon: "AM",
  flipkart: "FK",
  croma: "CR",
  myntra: "MY",
  cashify: "CA",
  "reliance digital": "RD",
  "vijay sales": "VS",
  "tata cliq": "TC",
  "google shopping": "GS",
};

const normalizeStoreKey = (store = "") =>
  store.toLowerCase().replace(/\s+/g, " ").trim();

const shortenLabel = (label) => {
  const cleaned = label
    .replace(/^www\./i, "")
    .replace(/\.(co\.in|com|in|net|org)$/i, "")
    .replace(/[-_.]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return cleaned || label || "Store";
};

export const getStoreColor = (store = "") => {
  const key = normalizeStoreKey(store);
  return storeColors[key] || storeColors[key.replace(/\s+/g, "")] || "#14b8a6";
};

export const getStoreMeta = (store = "") => {
  const key = normalizeStoreKey(store);
  const label = storeLabels[key] || shortenLabel(store);
  return {
    label,
    initials: storeInitials[key] || label.slice(0, 2).toUpperCase(),
    color: getStoreColor(store),
  };
};

export default storeColors;
