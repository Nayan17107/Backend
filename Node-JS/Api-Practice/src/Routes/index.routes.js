const express = require('express');
const { registerUser, getAllUser, loginUser } = require('../Controller/auth.controller');
const { uploadImage } = require('../Middleware/uploadImage');

const routes = express.Router();

routes.post("/register", uploadImage.single('profileImage'), registerUser);
// routes.post("/login", loginUser);
// routes.get("/get-users", getAllUser);

module.exports = routes;