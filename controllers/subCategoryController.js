const slugify = require("slugify");
const asyncHandler = require('express-async-handler');
const SubCategory = require("../models/subCategoryModel");
const _Error = require("../utils/Error");
const ApiFeatures = require("../utils/apiFeatures");
const factory = require("./handlersFactory");

exports.createSubCategory = factory.createOne(SubCategory);

exports.getSubCategories = factory.getAll(SubCategory);

exports.getSubCategory = factory.getOne(SubCategory)

exports.updateSubCategory = factory.updateOne(SubCategory);

exports.deleteSubCategory = factory.deleteOne(SubCategory);