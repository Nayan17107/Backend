require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const apiLimiter = require("./middlewares/rateLimiter");
const errorHandler = require("./middlewares/errorHandler");
const searchRoutes = require("./routes/searchRoutes");
const historyRoutes = require("./routes/historyRoutes");
const favoritesRoutes = require("./routes/favoritesRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true
  })
);
app.use(express.json({ limit: "1mb" }));
app.use("/api", apiLimiter);
app.use("/api", searchRoutes);
app.use("/api", historyRoutes);
app.use("/api", favoritesRoutes);

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
