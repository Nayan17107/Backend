const express = require('express');
const { dashboardPage } = require('../controller/index.controller');
const routes = express.Router();

routes.get("/", dashboardPage);
routes.use("/admin", require("./admin.routes"));

module.exports = routes;