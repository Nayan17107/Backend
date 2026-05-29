const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database Connected successfully");
  } catch (error) {
    console.error("Database connection failed", error);
  }
};

module.exports = dbConnection;
