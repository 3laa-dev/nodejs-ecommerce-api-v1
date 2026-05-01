
const SubCategory = require("../models/subCategoryModel");

const factory = require("./handlersFactory");

exports.createSubCategory = factory.createOne(SubCategory);

exports.getSubCategories = factory.getAll(SubCategory);

exports.getSubCategory = factory.getOne(SubCategory)

exports.updateSubCategory = factory.updateOne(SubCategory);

exports.deleteSubCategory = factory.deleteOne(SubCategory);