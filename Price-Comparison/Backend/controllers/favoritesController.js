const mongoose = require("mongoose");
const Favorite = require("../models/Favorite");

const ensureDatabase = (res) => {
  if (mongoose.connection.readyState === 1) return true;
  res.status(503).json({ message: "Database is not connected" });
  return false;
};

const getFavorites = async (_req, res, next) => {
  try {
    if (!ensureDatabase(res)) return;
    const favorites = await Favorite.find().sort({ savedAt: -1 });
    return res.json(favorites);
  } catch (error) {
    return next(error);
  }
};

const saveFavorite = async (req, res, next) => {
  try {
    if (!ensureDatabase(res)) return;
    const {
      title,
      price,
      url,
      image,
      source,
      numericPrice,
      rating,
      availability,
      inStock,
      delivery,
      discount,
      details,
      marketplace
    } = req.body;
    if (!title || !price || !url || !source) {
      return res.status(400).json({ message: "title, price, url, and source are required" });
    }

    const favorite = await Favorite.create({
      title,
      price,
      url,
      image,
      source,
      numericPrice,
      rating,
      availability,
      inStock,
      delivery,
      discount,
      details,
      marketplace
    });
    return res.status(201).json(favorite);
  } catch (error) {
    return next(error);
  }
};

const deleteFavorite = async (req, res, next) => {
  try {
    if (!ensureDatabase(res)) return;
    const favorite = await Favorite.findByIdAndDelete(req.params.id);
    if (!favorite) {
      return res.status(404).json({ message: "Favorite not found" });
    }

    return res.json({ message: "Favorite removed" });
  } catch (error) {
    return next(error);
  }
};

module.exports = { getFavorites, saveFavorite, deleteFavorite };
