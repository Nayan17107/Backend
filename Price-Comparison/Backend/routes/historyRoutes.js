const express = require("express");
const { getHistory, getPriceHistoryChart } = require("../controllers/historyController");

const router = express.Router();

router.get("/history", getHistory);
router.get("/history/chart", getPriceHistoryChart);

module.exports = router;
