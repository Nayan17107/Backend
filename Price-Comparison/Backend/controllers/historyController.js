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

const formatChartDate = (date) => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = d.toLocaleDateString("en-IN", { month: "short" });
  return `${day} ${month}`;
};

const ALLOWED_STORES = [
  "amazon",
  "flipkart",
  "cashify",
  "reliance digital",
  "vijay sales",
];

const STORE_LABELS = {
  amazon: "Amazon",
  flipkart: "Flipkart",
  cashify: "Cashify",
  "reliance digital": "Reliance Digital",
  "vijay sales": "Vijay Sales",
};

const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const dayKeyOf = (d) => {
  const dt = new Date(d);
  dt.setHours(0, 0, 0, 0);
  return dt.getTime(); 
};

const getPriceHistoryChart = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ message: "Database not connected" });
    }

    const query = String(req.query.query || "")
      .trim()
      .toLowerCase();

    const days = Number(req.query.days || 90);
    if (!Number.isFinite(days) || days <= 0) {
      return res
        .status(400)
        .json({ message: "days must be a positive number" });
    }

    if (!query) {
      return res.status(400).json({ message: "Query parameter is required" });
    }

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const fetchBufferDays = 30;
    const fetchStartDate = new Date();
    fetchStartDate.setDate(fetchStartDate.getDate() - fetchBufferDays);

    const exactRegex = `^${escapeRegex(query)}$`;
    const partialRegex = escapeRegex(query);

    const historyDocsExact = await PriceHistory.find({
      productQuery: { $regex: exactRegex, $options: "i" },
      store: { $in: ALLOWED_STORES },
    }).sort({ recordedAt: 1 });

    let historyDocs = historyDocsExact;

    if (!historyDocs || historyDocs.length === 0) {
      const partialDocs = await PriceHistory.find({
        productQuery: { $regex: partialRegex, $options: "i" },
        store: { $in: ALLOWED_STORES },
      }).sort({ recordedAt: 1 });

      if (partialDocs && partialDocs.length > 0) {
        const groupedByQuery = {};
        partialDocs.forEach((doc) => {
          if (!groupedByQuery[doc.productQuery])
            groupedByQuery[doc.productQuery] = [];
          groupedByQuery[doc.productQuery].push(doc);
        });

        let bestMatch = null;
        let maxEntries = 0;
        Object.entries(groupedByQuery).forEach(([pq, docs]) => {
          if (docs.length > maxEntries) {
            maxEntries = docs.length;
            bestMatch = pq;
          }
        });

        historyDocs = bestMatch ? groupedByQuery[bestMatch] : [];
      }
    }

    if (!historyDocs || historyDocs.length === 0) {
      return res.json({
        stores: [],
        data: [],
        lowest: null,
        message: "No price history found",
      });
    }

    const dayPriceMap = {};

    let lowestPrice = Number.MAX_SAFE_INTEGER;
    let lowestStore = "";
    let lowestDate = null;

    historyDocs.forEach((doc) => {
      if (!ALLOWED_STORES.includes(doc.store)) return;
      if (doc.recordedAt < fetchStartDate) return;

      const store = doc.store;
      const dKey = dayKeyOf(doc.recordedAt);

      if (!dayPriceMap[store]) dayPriceMap[store] = new Map();
      const storeDayMap = dayPriceMap[store];

      const existing = storeDayMap.get(dKey);

      if (!existing || doc.recordedAt >= existing.recordedAt) {
        storeDayMap.set(dKey, { price: doc.price, recordedAt: doc.recordedAt });
      }

      if (doc.price < lowestPrice) {
        lowestPrice = doc.price;
        lowestStore = store;
        lowestDate = doc.recordedAt;
      }
    });

    let storeData = {};
    Object.entries(dayPriceMap).forEach(([store, map]) => {
      const entries = Array.from(map.entries())
        .map(([dKey, v]) => ({ date: new Date(Number(dKey)), price: v.price }))
        .sort((a, b) => a.date - b.date);

      const deduped = [];
      for (const e of entries) {
        const last = deduped[deduped.length - 1];
        if (!last || last.price !== e.price) deduped.push(e);
      }

      storeData[store] = deduped;
    });

    const stores = Object.keys(storeData);
    if (stores.length === 0) {
      return res.json({
        stores: [],
        data: [],
        lowest: null,
        message: "No price data found in time range",
      });
    }

    const allDates = [];
    stores.forEach((store) => {
      storeData[store].forEach((entry) => {
        allDates.push(new Date(entry.date));
      });
    });

    const firstRecordDate = new Date(Math.min(...allDates));
    const chartStartDate = new Date(
      Math.max(startDate.getTime(), firstRecordDate.getTime()),
    );

    const sortedDates = [];
    const tempDate = new Date(chartStartDate);
    const today = new Date();
    tempDate.setHours(0, 0, 0, 0);
    today.setHours(23, 59, 59, 999);

    while (tempDate <= today) {
      sortedDates.push(new Date(tempDate));
      tempDate.setDate(tempDate.getDate() + 1);
    }

    const chartData = [];
    const storePointers = {};
    const lastKnownPrices = {};

    stores.forEach((store) => {
      storePointers[store] = 0;
      lastKnownPrices[store] = null;
    });

    sortedDates.forEach((d) => {
      const row = { date: formatChartDate(d), _timestamp: d.getTime() };
      let hasAnyPrice = false;

      stores.forEach((store) => {
        const prices = storeData[store];

        while (
          storePointers[store] < prices.length &&
          dayKeyOf(prices[storePointers[store]].date) === dayKeyOf(d)
        ) {
          lastKnownPrices[store] = prices[storePointers[store]].price;
          storePointers[store]++;
        }

        const normalizedStoreName = STORE_LABELS[store] || store;
        const currentPrice = lastKnownPrices[store];
        row[normalizedStoreName] = currentPrice !== null ? currentPrice : null;
        if (currentPrice !== null) hasAnyPrice = true;
      });

      if (hasAnyPrice) chartData.push(row);
    });

    const filteredChartData = [];
    for (let i = 0; i < chartData.length; i++) {
      const currentRow = chartData[i];
      const previousRow = chartData[i - 1];

      if (i === 0) {
        filteredChartData.push(currentRow);
        continue;
      }

      let isDifferent = false;
      stores.forEach((store) => {
        const normalizedName = STORE_LABELS[store] || store;
        if (currentRow[normalizedName] !== previousRow[normalizedName]) {
          isDifferent = true;
        }
      });

      if (isDifferent || i === chartData.length - 1) {
        filteredChartData.push(currentRow);
      } else if (filteredChartData.length > 0) {
        filteredChartData[filteredChartData.length - 1] = currentRow;
      }
    }

    if (filteredChartData.length < 2 && chartData.length >= 2) {
      filteredChartData.length = 0;
      filteredChartData.push(chartData[0]);
      filteredChartData.push(chartData[chartData.length - 1]);
    }

    const normalizedStores = stores.map((s) => STORE_LABELS[s] || s);
    const normalizedLowestStore = STORE_LABELS[lowestStore] || lowestStore;

    const response = {
      stores: normalizedStores,
      data: filteredChartData,
      lowest:
        lowestPrice === Number.MAX_SAFE_INTEGER
          ? null
          : {
              price: lowestPrice,
              store: normalizedLowestStore,
              date: formatChartDate(lowestDate || new Date()),
            },
      query,
      priceRanges: stores.reduce((acc, store) => {
        const prices = storeData[store];
        if (prices && prices.length > 0) {
          acc[STORE_LABELS[store] || store] = {
            min: Math.min(...prices.map((p) => p.price)),
            max: Math.max(...prices.map((p) => p.price)),
            points: prices.length,
          };
        }
        return acc;
      }, {}),
    };

    return res.json(response);
  } catch (error) {
    return next(error);
  }
};

module.exports = { getHistory, getPriceHistoryChart };
