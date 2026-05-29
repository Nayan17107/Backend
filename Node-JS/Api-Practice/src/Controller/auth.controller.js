const User = require('../Model/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.json({ message: 'User already exist' })
        }

        let imagepath = "";
        if (req.file) {
            imagepath = `/uploads/${req.file.filename}`;
        }

        let hashPassword = await bcrypt.hash(req.body.password, 12);
        user = await User.create({
            ...req.body,
            password: hashPassword,
            profileImage: imagepath
        });
        return res.json({ message: 'User Register', user });
    } catch (error) {
        console.log(error);
        return res.json({ message: 'Server error' })
    }
}

exports.loginUser = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email })
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        let match = await bcrypt.compare(req.body.password, user.password);
        if (!match) {
            return res.json({ message: 'Email or Password is incorrect' });
        }

        let token = jwt.sign({ userId: user._id }, 'developement')
        return res.json({ message: 'Login Success', status: 200, token })

    } catch (error) {
        console.log(error);
        return res.json({ message: 'Server error' })
    }
}

exports.getAllUser = async (req, res) => {
    try {
        let users = await User.find();
        return res.json({ message: 'Fetch All Users', users });
    } catch (error) {
        console.log(error);
        return res.json({ message: 'Server error' })
    }
}