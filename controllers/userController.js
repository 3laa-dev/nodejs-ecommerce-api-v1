
const asyncHandler = require('express-async-handler');
const sharp = require("sharp");
const guid = require("guid");
const bcrypt = require("bcrypt");

const factory = require("./handlersFactory");
const { uploadSingleImage } = require("../middlewares/uploadImageMiddleware");
const User = require("../models/userModel");
const { default: slugify } = require('slugify');


exports.uploadUserImage = uploadSingleImage("profileImage");

exports.resizeImage = asyncHandler(async (req, res, next) => {
    if (req.file) {
        const filename = `user-${guid.create()}.png`
        await sharp(req.file.buffer)
            .resize(600, 600)
            .toFormat("png")
            .png({ quality: 90 })
            .toFile(`uploads/users/${filename}`);
        req.body.profileImage = filename;
    }
    next();
})

exports.createUser = factory.createOne(User);

exports.getUsers = factory.getAll(User);

exports.getUser = factory.getOne(User);

exports.updateUser = asyncHandler(async (req, res) => {
    const newData =  {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            profileImage: req.body.profileImage,
            role: req.body.role
        }
    if(req.body.name)
        newData.slug = slugify(req.body.name);
    const updatedUser = await User.findByIdAndUpdate(req.params.id,
        newData,
        { returnDocument: "after" })
    res.json(updatedUser);
})

exports.changeUserPassword = asyncHandler(async (req, res) => {
    const updatedUser = await User.findByIdAndUpdate(req.params.id,
        { 
            password: await bcrypt.hash(req.body.password , 10) , 
            passwordChangedAt:Date.now()
         },
        { returnDocument: "after" }
    )
     res.json(updatedUser);
})
exports.deleteUser = factory.deleteOne(User);