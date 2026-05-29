const express = require('express');

const { dashboardPage, addStudent, deleteStudent, editStudent, updateStudent } = require('../controller/student.controller');
const uploadImage = require('../middleware/imageUpload');
const routes = express.Router();

routes.get("/", dashboardPage);

routes.post("/add-student", uploadImage.single('profileImage'), addStudent)

routes.get("/delete-student/:id", deleteStudent)

routes.get("/edit-student/:id", editStudent)

routes.post("/update-student/:id", uploadImage.single('profileImage'), updateStudent)


module.exports = routes;