const mongoose = require("mongoose");

const connectDB = async () => {
  const url = process.env.MONGODB_URI;

  try {
    await mongoose.connect(url, {
      serverSelectionTimeoutMS: 5000
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error(`MongoDB connection failed: ${error.message}`);
  }
};

module.exports = connectDB;
