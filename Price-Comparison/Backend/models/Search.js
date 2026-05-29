const mongoose = require("mongoose");

const searchSchema = new mongoose.Schema(
  {
    query: {
      type: String,
      required: true,
      trim: true
    },
    resultCount: {
      type: Number,
      default: 0
    },
    searchedAt: {
      type: Date,
      default: Date.now
    }
  },
  { versionKey: false }
);

module.exports = mongoose.model("Search", searchSchema);
