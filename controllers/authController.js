const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/userModel");
const _Error = require("../utils/Error");

const generateJWT = async (payload) => {
    
    const token = await jwt.sign({ userId: payload }, process.env.JWT_SECRET_KEY , {expiresIn:"90d"});
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
        return next(new _Error("Enter Email and password" , 401))

    const user = await User.findOne({ email });
    
    if (!(user && await bcrypt.compare(password, user.password)))
        return next(new _Error("Incorrect Email or Password" , 401));


    const token = await generateJWT(user._id);
    res.json({data:user , token})

})

exports.protect = asyncHandler(async (req, res, next) => {
    let token ;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
        token = req.headers.authorization.split(" ")[1];
    if(!token)
        return next (new _Error("You are not login, Please login to get access this route", 401));

    const decodedToken = jwt.verify(token , process.env.JWT_SECRET_KEY);
    
    const user = await User.findById(decodedToken.userId);
    if(!user)
        return next(new _Error("The user that belong to this token does no longer exist" , 401));

    if(user.passwordChangedAt){
        const passChangedTimestamp = parseInt(user.passwordChangedAt.getTime() / 1000 , 10);
        if(passChangedTimestamp > decodedToken.iat)
            return next(new _Error("User recently changed his password. please login again..." , 401));
    }

    req.user = user;

    next();
    
})

exports.allowedTo = (...roles)=>
     (req , res , next)=>{
        if(!roles.includes(req.user.role))
            return next(new _Error("You are not allowed to access this route" , 403));
        next();
    }
