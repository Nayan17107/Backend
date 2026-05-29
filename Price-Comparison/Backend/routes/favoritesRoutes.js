const express = require("express");
const { deleteFavorite, getFavorites, saveFavorite } = require("../controllers/favoritesController");

const router = express.Router();

router.get("/favorites", getFavorites);
router.post("/favorites", saveFavorite);
router.delete("/favorites/:id", deleteFavorite);

module.exports = router;
