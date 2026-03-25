
const asyncHandler = require('express-async-handler');


const Product = require("../models/productModel");
const _Error = require("../utils/Error");
const {uploadMixOfImages} = require("../middlewares/uploadImageMiddleware");
const factory = require("./handlersFactory");

const sharp = require("sharp");
const guid = require("guid");
const multer = require("multer");

const storage = multer.memoryStorage();

const fileFilter = function (req, file, cb) {
    const type = file.mimetype.split("/")[0];
    if (type === "image")
        cb(null, true);
    else
        cb(new _Error("Only image allowed"), 400);
}



const upload = multer({ storage, fileFilter })

exports.uploadProductImages = upload.fields([
    {
        name: "imageCover",
        maxCount: 1
    },
    {
        name: "images",
        maxCount: 5
    }
])


exports.resizeProductImages = async (req, res, next) => {

    if (req.files.imageCover) {
        const imageCover = `product-${guid.create()}-cover.png`
        await sharp(req.files.imageCover[0].buffer)
            .resize(2000, 1333)
            .toFormat("png")
            .png({ quality: 90 })
            .toFile(`uploads/products/${imageCover}`);
        req.body.imageCover = imageCover;
    }
    if (req.files.images) {
        req.body.images = [];
        await Promise.all(
            req.files.images.map(async (image, index) => {
            const imageName = `product-${guid.create()}-${index + 1}.png`
            await sharp(image.buffer)
                .resize(2000, 1333)
                .toFormat("png")
                .png({ quality: 90 })
                .toFile(`uploads/products/${imageName}`);
            req.body.images.push(imageName);
        })
        )
    }

    next();
}

exports.createProduct = factory.createOne(Product);

exports.getProducts = factory.getAll(Product);

exports.getProduct = factory.getOne(Product)
// .populate({ path: "category", select: "name -_id" });
exports.updateProduct = factory.updateOne(Product)

exports.deleteProduct = factory.deleteOne(Product);
