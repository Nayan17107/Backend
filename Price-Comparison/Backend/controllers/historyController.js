const mongoose = require("mongoose");
const Search = require("../models/Search");
const PriceHistory = require("../models/PriceHistory");

const getHistory = async (_req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json([]);
    }

    const searches = await Search.find().sort({ searchedAt: -1 }).limit(15);
    return res.json(searches);
  } catch (error) {
    return next(error);
  }
};

// Generate mock historical data for a given price with slight variations
const generateMockHistory = (currentPrice, days = 90) => {
  const data = [];
  const now = new Date();
  const startDate = new Date(now);
  startDate.setDate(startDate.getDate() - days);

  // Simulate a gradual price decrease with random variations - create daily data points
  let price = currentPrice * 1.15; // Start 15% higher
  for (let i = 0; i <= days; i += 3) {  // Create data point every 3 days for better detail
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    const variation = (Math.random() - 0.5) * 0.08 * currentPrice; // 8% random variation
    price = Math.max(currentPrice * 0.95, price - currentPrice * 0.007 + variation);
    data.push({
      date,
      price: Math.round(price)
    });
  }
  return data;
};

// Format date as "DD Mon"
const formatChartDate = (date) => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = d.toLocaleDateString("en-IN", { month: "short" });
  return `${day} ${month}`;
};

const getPriceHistoryChart = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ message: "Database not connected" });
    }

    const query = String(req.query.query || "").trim().toLowerCase();
    const days = parseInt(req.query.days || "90", 10);

    if (!query) {
      return res.status(400).json({ message: "Query parameter is required" });
    }

    if (days < 7) {
      return res.status(400).json({ message: "Days must be at least 7" });
    }

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Get real price history data
    const historyDocs = await PriceHistory.find({
      productQuery: query,
      recordedAt: { $gte: startDate }
    }).sort({ recordedAt: 1 });

    // Group by store
    const storeData = {};
    let lowestPrice = Number.MAX_SAFE_INTEGER;
    let lowestStore = "";
    let lowestDate = null;

    historyDocs.forEach((doc) => {
      if (!storeData[doc.store]) {
        storeData[doc.store] = [];
      }
      storeData[doc.store].push({
        date: doc.recordedAt,
        price: doc.price
      });

      if (doc.price < lowestPrice) {
        lowestPrice = doc.price;
        lowestStore = doc.store;
        lowestDate = doc.recordedAt;
      }
    });

    const stores = Object.keys(storeData);

    // If insufficient data, generate mock data for visualization
    if (historyDocs.length < 7) {
      const mockStores = ["flipkart", "amazon", "croma"];
      const mockData = {};

      mockStores.forEach((store) => {
        if (storeData[store]) {
          mockData[store] = storeData[store];
        } else {
          // Generate realistic mock data based on average current price
          const avgPrice = Math.round(
            historyDocs.reduce((sum, doc) => sum + doc.price, 0) / Math.max(1, historyDocs.length)
          ) || 50000;
          mockData[store] = generateMockHistory(avgPrice, days);
        }
      });

      storeData = mockData;
      stores = Object.keys(mockData);

      // Find lowest in mock data
      Object.entries(mockData).forEach(([store, pricePoints]) => {
        pricePoints.forEach((point) => {
          if (point.price < lowestPrice) {
            lowestPrice = point.price;
            lowestStore = store;
            lowestDate = point.date;
          }
        });
      });
    }

    // Create unified timeline with all dates
    const allDates = new Set();
    Object.values(storeData).forEach((prices) => {
      prices.forEach((p) => {
        allDates.add(new Date(p.date).toDateString());
      });
    });

    const sortedDates = Array.from(allDates)
      .map((d) => new Date(d))
      .sort((a, b) => a - b);

    // Create chart data with interpolation
    const chartData = sortedDates.map((d) => {
      const row = { date: formatChartDate(d) };

      stores.forEach((store) => {
        const prices = storeData[store];
        const nearestPrice = prices.reduce((nearest, p) => {
          const pDate = new Date(p.date);
          const nearestDate = new Date(nearest.date);
          return Math.abs(pDate - d) < Math.abs(nearestDate - d) ? p : nearest;
        });
        row[store] = nearestPrice.price;
      });

      return row;
    });

    // Normalize store names to proper labels
    const storeLabels = {
      amazon: "Amazon",
      flipkart: "Flipkart",
      croma: "Croma",
      myntra: "Myntra",
      cashify: "Cashify",
      "reliance digital": "Reliance Digital",
      "vijay sales": "Vijay Sales",
      "tata cliq": "Tata CLiQ",
      "google shopping": "Google Shopping"
    };

    const normalizedStores = stores.map((s) => storeLabels[s] || s);
    const normalizedLowestStore = storeLabels[lowestStore] || lowestStore;

    return res.json({
      stores: normalizedStores,
      data: chartData,
      lowest: {
        price: lowestPrice,
        store: normalizedLowestStore,
        date: formatChartDate(lowestDate || new Date())
      }
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = { getHistory, getPriceHistoryChart };
