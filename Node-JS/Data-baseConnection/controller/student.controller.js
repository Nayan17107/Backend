const StudentModel = require("../model/student.model");
const path = require('path');
const fs = require('fs');

exports.dashboardPage = async (req, res) => {
  let students = await StudentModel.find();
  return res.render("index", { students });
};

exports.addStudent = async (req, res) => {
 try {
  //  console.log("Body: ",req.body);
  //  console.log("File: ",req.file);
  let imagepath = "";
  if(req.file){
    imagepath = `/uploads/${req.file.filename}`
  }

  await StudentModel.create({...req.body, profileImage: imagepath});
  return res.redirect("/");
 } catch (error) {
  console.log(error);
  return res.redirect("/");
 }
};

exports.deleteStudent = async (req, res) => {
  let id = req.params.id;
  let student = await StudentModel.findById(id);
  if (!student) {
    console.log("student is not found");
    return res.redirect("/");
  }
  if(student.profileImage != ""){
    let imagepath = path.join(__dirname, "..",  student.profileImage)
    try{
      await fs.unlinkSync(imagepath);
    }catch(err){
      console.log('File Missing: ', err.message)
    }
  }
  // console.log(student);
  await StudentModel.findByIdAndDelete(id); // perment delete
  return res.redirect("/");
};

exports.editStudent = async (req, res) => {
  try {
    let id = req.params.id;
    let student = await StudentModel.findById(id);
    if (!student) {
      console.log("student is not found");
      return res.redirect("/");
    }
    return res.render("editStudent", { student });
  } catch (error) {
    console.log(error);
    return res.redirect("/");
  }
};

exports.updateStudent = async (req, res) => {
  let id = req.params.id;
  let imagepath
  let student = await StudentModel.findById(id);
  if (!student) {
    console.log("student is not found");
    return res.redirect("/");
  }
  if(req.file){
    if(student.profileImage != ""){
      imagepath = path.join(__dirname, "..",  student.profileImage)
      try{
        await fs.unlinkSync(imagepath);
      }catch(err){
        console.log('File Missing: ', err.message)
      }
    }
    imagepath = `/uploads/${req.file.filename}`
  }else{
    imagepath = student.profileImage;
  }
  let user = await StudentModel.findByIdAndUpdate(id, {...req.body, profileImage: imagepath}, { new: true });
  return res.redirect("/");
};
