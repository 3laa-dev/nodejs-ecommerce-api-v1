const slugify = require("slugify");
const asyncHandler = require('express-async-handler');
const Brand = require("../models/brandModel");
const _Error = require("../utils/Error");
const ApiFeatures =require("../utils/apiFeatures");
const factory = require("./handlersFactory");


exports.createBrand = factory.createOne(Brand);

exports.getBrands = factory.getAll(Brand);

exports.getBrand = factory.getOne(Brand);

exports.updateBrand = factory.updateOne(Brand);

exports.deleteBrand = factory.deleteOne(Brand);