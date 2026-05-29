const express = require("express");
const port = 8080;
const app = express();
const dbconnaction = require('./config/dbConnection')

dbconnaction();

// Middleware
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use("/uploads" ,express.static("uploads"));

// Routes
app.use("/", require('./routes/index.routes'));

app.listen(port, () => {
    console.log(`Server start at http://localhost:${port}`);
});
