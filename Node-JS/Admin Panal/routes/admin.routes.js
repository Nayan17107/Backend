const express = require('express');
const { addAdminepage, viewAdmin, addAdmin } = require('../controller/admin.controller');
const upload = require('../middleware/uploadimgs');
const routes = express.Router();

routes.get("/add-admin", addAdminepage);
routes.post('/add-admin', upload.single("profileImage"), addAdmin)
routes.get("/view-admin", viewAdmin);

module.exports = routes;