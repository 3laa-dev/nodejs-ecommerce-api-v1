const validatorMiddlware = require("../../middlewares/validatorMiddleware");
const Category = require("../../models/categoryModel");
const SubCategory = require("../../models/subCategoryModel");
const { param, body } = require("express-validator");
const slugify = require("slugify");

exports.getProductValidator = [
    param("id")
        .isMongoId()
        .withMessage("Invalid Product id format"),
    validatorMiddlware
]

exports.createProductValidator = [
    body("title")
        .notEmpty()
        .withMessage("title is required")
        .isLength({ min: 2 })
        .withMessage("Too short product title")
        .isLength({ max: 100 })
        .withMessage("Too Long product title")
        .custom((val , {req})=>{
                            req.body.slug = slugify(val)
                            return true;
                        }),
    body("description")
        .isLength({ min: 20 })
        .withMessage("Too short product description")
        .isLength({ max: 2000 })
        .withMessage("Too long product description")
        .notEmpty()
        .withMessage("title is required"),
    body("quantity")
        .notEmpty()
        .withMessage("Product quantity is required")
        .isNumeric()
        .withMessage("Product quantity must be a namber"),
    body("sold")
        .optional()
        .isNumeric()
        .withMessage("Product quantity must be a namber"),
    body("price")
        .notEmpty()
        .withMessage("price is required")
        .isNumeric()
        .withMessage("Product price must be a number")
        .isFloat({ max: 1000000 }),
    body("priceAfterDiscount")
        .optional()
        .toFloat()
        .isNumeric()
        .withMessage("product pr-af-dis must be a number")
        .custom((value, { req }) => {
            if (req.body.price <= value)
                throw new Error("pr-af-dis must be lower than price")
            return true;
        }),
    body("colors")
        .optional()
        .isArray()
        .withMessage("colors should be array of string"),
    body("imageCover")
        .notEmpty()
        .withMessage("Product cover image is required"),
    body("images")
        .optional()
        .isArray()
        .withMessage("Product images should be array of string"),
    body("category")
        .notEmpty()
        .withMessage("Product must be belong to category")
        .isMongoId()
        .withMessage("invaled category id")
        .custom(async categoryId => {
            const category = await Category.findById(categoryId)
            if (!category)
                throw new Error("This category is not found")
            return true
        }),
    body("subCategories")
        .optional()
        .isMongoId()
        .withMessage("invaled sub category mongo id")
        .custom(async arr => {
            const subCategories = await SubCategory.find({ _id: { $in: arr } })
            if (subCategories.length !== arr.length)
                throw new Error("This sub category is not found") // language
            return true
        })
        .custom(async (arr, { req }) => {
            const catId = req.body.category;
            const subCat = await SubCategory.find({ category: catId })

            const subCatIds = subCat.map(e => e = e._id.toString());
            arr.map(e => {
                if (!subCatIds.includes(e))
                    throw new Error("This sub category is not include tu this category") // language
            })
            return false
        }),
    body("brand")
        .optional()
        .isMongoId()
        .withMessage("invaled brand mongo id "),
    body("ratingsAverage")
        .isNumeric()
        .optional()
        .withMessage("avarage must be a number")
        .isFloat({ max: 5 })
        .withMessage("avarage must be bellow or equal 5.0")
        .isFloat({ max: 1 })
        .withMessage("avarege must be above or equal 1.0"),
    body("ratingsQuantity")
        .optional()
        .isNumeric()
        .withMessage("quantity must be a number"),

    validatorMiddlware
]

exports.updateProductValidator = [
    param("id")
        .isMongoId()
        .withMessage("Invalid Product id format"),
    body("title")
        .optional()
        .isLength({ min: 2 })
        .withMessage("Too short product title")
        .isLength({ max: 100 })
        .withMessage("Too Long product title")
        .notEmpty()
        .withMessage("title is required")
        .custom((val , {req})=>{
                            req.body.slug = slugify(val)
                            return true;
                        }),
    body("description")
        .optional()
        .isLength({ min: 20 })
        .withMessage("Too short product descrition")
        .isLength({ max: 2000 })
        .withMessage("Too long product descrition")
        .notEmpty()
        .withMessage("title is required"),
    body("quantity")
        .optional()
        .notEmpty()
        .withMessage("Product quantity is required")
        .isNumeric()
        .withMessage("Product quantity must be a namber"),
    body("sold")
        .optional()
        .isNumeric()
        .withMessage("Product quantity must be a namber"),
    body("price")
        .optional()
        .notEmpty()
        .withMessage("price is required")
        .isNumeric()
        .withMessage("Product price must be a number")
        .isFloat({ max: 1000000 }),
    body("priceAfterDiscount")
        .optional()
        .toFloat()
        .isNumeric()
        .withMessage("product pr-af-dis must be a number")
        .custom((value, { req }) => {
            if (req.body.price <= value)
                throw new Error("pr-af-dis must be lower than price")
            return true;
        }),
    body("colors")
        .optional()
        .isArray()
        .withMessage("colors should be array of string"),
    body("imageCover")
        .optional()
        .notEmpty()
        .withMessage("imageCover cannot be empty"),
    body("images")
        .optional()
        .isArray()
        .withMessage("Product images should be array of string"),
    body("category")
        .optional()
        .notEmpty()
        .withMessage("Product must be belong to category")
        .isMongoId()
        .withMessage("invaled category id")
        .custom(async categoryId => {
            const category = await Category.findById(categoryId)
            if (!category)
                throw new Error("This category is not found")
            return true
        }),
    body("subCategories")
        .optional()
        .isMongoId()
        .withMessage("invaled sub category mongo id")
        .custom(async arr => {
            const subCategories = await SubCategory.find({ _id: { $in: arr } })
            if (subCategories.length !== arr.length)
                throw new Error("This sub category is not found")
            return true
        })
    ,
    body("brand")
        .optional()
        .isMongoId()
        .withMessage("invaled brand mongo id "),
    body("ratingsAverage")
        .optional()
        .isNumeric()
        .withMessage("avarage must be a number")
        .isFloat({ max: 5 })
        .isFloat({ min: 1, max: 5 })
        .withMessage("average must be between 1 and 5"),
    body("ratingsQuantity")
        .optional()
        .isNumeric()
        .withMessage("quantity must be a number"),


    validatorMiddlware
]
//"Google Pixel 8 Pro"
exports.deleteProductValidator = [
    param("id")
        .isMongoId()
        .withMessage("Invalid Product id format"),
    validatorMiddlware
]