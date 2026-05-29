require("dotenv").config();

const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 5100;
const dbConnection = require("./config/db");
const todoRoutes = require("./routs/todo.routes");

dbConnection();
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/todos", todoRoutes);

app.listen(PORT, () => {
  console.log(`Server Started at the Port ${PORT}`);
});
