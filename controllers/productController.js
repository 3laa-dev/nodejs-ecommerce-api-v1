const slugify = require("slugify");
const asyncHandler = require('express-async-handler');
const Product = require("../models/productModel");
const _Error = require("../utils/Error");
const ApiFeatures = require("../utils/apiFeatures");
const factory = require("./handlersFactory");

exports.createProduct = factory.createOne(Product);

exports.getProducts = factory.getAll(Product);

exports.getProduct = factory.getOne(Product)
// .populate({ path: "category", select: "name -_id" });
exports.updateProduct = factory.updateOne(Product)

exports.deleteProduct = factory.deleteOne(Product);
