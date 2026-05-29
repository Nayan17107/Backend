const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    price: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    image: {
      type: String,
      default: ""
    },
    source: {
      type: String,
      required: true
    },
    numericPrice: {
      type: Number,
      default: null
    },
    rating: {
      type: Number,
      default: null
    },
    availability: {
      type: String,
      default: ""
    },
    inStock: {
      type: Boolean,
      default: true
    },
    delivery: {
      type: String,
      default: ""
    },
    discount: {
      type: String,
      default: ""
    },
    details: {
      type: String,
      default: ""
    },
    marketplace: {
      type: String,
      default: ""
    },
    savedAt: {
      type: Date,
      default: Date.now
    }
  },
  { versionKey: false }
);

module.exports = mongoose.model("Favorite", favoriteSchema);
