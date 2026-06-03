const mongoose = require("mongoose");

const priceHistorySchema = new mongoose.Schema(
  {
    productQuery: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      index: true
    },
    store: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      index: true
    },
    price: {
      type: Number,
      required: true
    },
    recordedAt: {
      type: Date,
      default: Date.now,
      index: true
    }
  },
  { versionKey: false }
);

priceHistorySchema.index({ productQuery: 1, recordedAt: -1 });
priceHistorySchema.index({ productQuery: 1, store: 1, recordedAt: -1 });

module.exports = mongoose.model("PriceHistory", priceHistorySchema);
