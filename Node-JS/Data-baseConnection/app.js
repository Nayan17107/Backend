const express = require("express");
const dbConnect = require("./config/dbConnection");

const port = 8000;
const app = express();

// dbConnection
dbConnect();

app.set("view engine", "ejs");
app.use(express.urlencoded());
app.use("/uploads", express.static("uploads"));

app.use("/", require('./routes/student.routes'));

app.listen(port, () => {
  console.log(`Server start at http://localhost:${port}`);
});



/*
  find(filter) => multiple record return (array)
  findById() => findOne(filter) => return single record
  findByIdAndUpdate(id, updateData) => findOneAndUpdate(filter, updateData)
  findByIdAndDelete(id) => findOneAndDelete(filter)


  MVC => m- model, v - views, c - controller, r - routes
  Routing => express.Router
*/