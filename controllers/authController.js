const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/userModel");
const _Error = require("../utils/Error");

const generateJWT = async (payload) => {
    
    const token = await jwt.sign({ userId: payload }, process.env.JWT_SECRET_KEY);
    return token;
}

exports.signup = asyncHandler(async (req, res, next) => {
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password })
    const token = await generateJWT(user._id);
    res.status(201).json({ data: user, token })
})

exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    if (!(email && password))
        return next(new _Error("Enter Email and password"))

    const user = await User.findOne({ email });
    
    if (!(user && await bcrypt.compare(password, user.password)))
        return next(new _Error("Incorrect Email or Password"));


    const token = await generateJWT(user._id);
    res.json({data:user , token})

})