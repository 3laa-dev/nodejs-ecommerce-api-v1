const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

exports.signup = asyncHandler(async (req , res , next)=>{
    const {name , email , password} = req.body;
    const user = await User.create({name ,email ,password})
    const token = await jwt.sign({userId:user._id} , process.env.JWT_SECRET_KEY);
    res.status(201).json({data:user , token})
})