const adminModel = require('../model/admin.model')
const bcrypt = require('bcrypt')
const path = require('path')
const fs = require('fs')

exports.addAdminepage = async (req, res) => {
    res.render('admin/add-admin')
}

exports.addAdmin = async (req, res) => {
    let imagepath = ""
    if (req.file) {
        imagepath = `/uploads/${req.file.filename}`
    }

    let haspassword = await bcrypt.hash(req.body.password, 10)
    try {
        await adminModel.create({
            ...req.body,
            password: haspassword,
            profileImage: imagepath
        })
        res.redirect('/admin/view-admin')
    } catch (error) {
        console.log(error)
        res.redirect('/admin/add-admin')
    }
}

exports.viewAdmin = async (req, res) => {
    try {
        let admins = await adminModel.find()
        return res.render("admin/view-admin", {admins});
    } catch (error) {
        console.log(error)
    }
};
