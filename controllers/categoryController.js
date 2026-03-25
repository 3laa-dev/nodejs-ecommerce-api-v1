const sharp = require("sharp");
const asyncHandler = require("express-async-handler");
const guid = require("guid");


const {uploadSingleImage} = require("../middlewares/uploadImageMiddleware");
const factory = require("./handlersFactory");
const Category = require("../models/categoryModel");




exports.uploadCategoryImage = uploadSingleImage("image");

exports.resizeImage = asyncHandler(async (req, res, next) => {
    if (req.file) {
        const filename = `category-${guid.create()}.png`
        await sharp(req.file.buffer)
            .resize(600, 600)
            .toFormat("png")
            .png({ quality: 90 })
            .toFile(`uploads/categories/${filename}`);
        req.body.image = filename;
    }
    next();
})

exports.createCategory = factory.createOne(Category);

exports.getCategories = factory.getAll(Category);

exports.getCategory = factory.getOne(Category);

exports.updateCategory = factory.updateOne(Category)

exports.deleteCategory = factory.deleteOne(Category)