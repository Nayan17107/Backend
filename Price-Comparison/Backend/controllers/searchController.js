const mongoose = require("mongoose");
const Search = require("../models/Search");
const PriceHistory = require("../models/PriceHistory");
const searchSerpApi = require("../services/serpApiService");

const CACHE_TTL = 5 * 60 * 1000;
const cache = new Map();

const getFromCache = (key) => {
  const cached = cache.get(key);
  if (!cached) return null;
  if (Date.now() - cached.createdAt > CACHE_TTL) {
    cache.delete(key);
    return null;
  }
  return cached.data;
};

const saveSearch = async (query, resultCount) => {
  if (mongoose.connection.readyState !== 1) return;
  await Search.create({ query, resultCount });
};

const savePriceHistory = async (query, products) => {
  if (mongoose.connection.readyState !== 1 || !products || products.length === 0) return;
  
  const historyDocs = products
    .filter((product) => Number(product.numericPrice) > 0)
    .map((product) => ({
      productQuery: query.toLowerCase().trim(),
      store: product.source ? product.source.toLowerCase().trim() : "unknown",
      price: product.numericPrice,
      recordedAt: new Date()
    }));

  if (historyDocs.length === 0) return;

  await PriceHistory.insertMany(historyDocs).catch((error) =>
    console.error(`Price history save failed: ${error.message}`)
  );
};

const searchProducts = async (req, res, next) => {
  try {
    const query = String(req.query.query || "").trim();
    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const cacheKey = query.toLowerCase();
    const cached = getFromCache(cacheKey);
    if (cached) {
      return res.json({ ...cached, cached: true });
    }

    const products = await searchSerpApi(query);
    const payload = {
      query,
      count: products.length,
      products,
      searchedAt: new Date()
    };

    cache.set(cacheKey, { createdAt: Date.now(), data: payload });
    saveSearch(query, products.length).catch((error) =>
      console.error(`Search history save failed: ${error.message}`),
    );
    savePriceHistory(query, products).catch((error) =>
      console.error(`Price history save failed: ${error.message}`),
    );

    return res.json(payload);
  } catch (error) {
    return next(error);
  }
};

module.exports = { searchProducts };
