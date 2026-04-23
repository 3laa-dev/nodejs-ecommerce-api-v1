const asyncHandler = require('express-async-handler');
const sharp = require("sharp");
const guid = require("guid");



const factory = require("./handlersFactory");
const {uploadSingleImage} = require("../middlewares/uploadImageMiddleware");
const Brand = require("../models/brandModel");


 
exports.uploadBrandImage = uploadSingleImage("image");

exports.resizeImage = asyncHandler(async (req, res, next) => {
    if (req.file) {
        const filename = `brand-${guid.create()}.png`
        await sharp(req.file.buffer)
            .resize(600, 600)
            .toFormat("png")
            .png({ quality: 90 })
            .toFile(`uploads/brands/${filename}`);
        req.body.image = filename;
    }
    next();
})

exports.createBrand = factory.createOne(Brand);

exports.getBrands = factory.getAll(Brand);

exports.getBrand = factory.getOne(Brand);

exports.updateBrand = factory.updateOne(Brand);

exports.deleteBrand = factory.deleteOne(Brand);