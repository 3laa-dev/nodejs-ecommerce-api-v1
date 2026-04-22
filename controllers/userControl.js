
const asyncHandler = require('express-async-handler');
const sharp = require("sharp");
const guid = require("guid");


const factory = require("./handlersFactory");
const {uploadSingleImage} = require("../middlewares/uploadImageMiddleware");
const User = require("../models/userModel");


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

exports.updateUser = factory.updateOne(User);

exports.deleteUser = factory.deleteOne(User);