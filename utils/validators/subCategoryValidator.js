const validatorMiddlware = require("../../middlewares/validatorMiddleware");
const { param, body } = require("express-validator");
const slugify = require("slugify")
const Category = require("../../models/categoryModel");

exports.createSubCategoryValidator = [
    body("name")
        .notEmpty()
        .withMessage("SubCategory required")
        .isLength({ min: 3 })
        .withMessage("Too short subCategory name")
        .isLength({ max: 32 })
        .withMessage("Too long subCategory name")
        .custom((val, { req }) => {
            req.body.slug = slugify(val)
            return true;
        }),
    body("category")
        .optional()
        .notEmpty()
        .withMessage("subCategory must be belong to category id")
        .isMongoId()
        .withMessage("Invalid Category id format")
        .custom(async val =>{
            const category = await Category.findById(val);
            if(!category)
                throw new Error(`This Category id: ${val} is not found`)
            return true
        }),
    validatorMiddlware
]
exports.getSubCategoryValidator = [
    param("id")
        .isMongoId()
        .withMessage("Invalid category id format"),
    validatorMiddlware
]
exports.updateSubCategoryValidator = [
    param("id")
        .isMongoId()
        .withMessage("Invalid subCategory id format"),
    body("name")
        .optional()
        .notEmpty()
        .withMessage("Category required")
        .isLength({ min: 3 })
        .withMessage("Too short subCategory name")
        .isLength({ max: 32 })
        .withMessage("Too long subCategory name")
        .custom((val , {req})=>{
                    req.body.slug = slugify(val)
                    return true;
                }),
    body("category")
        .optional()
        .isMongoId()
        .withMessage("Invalid Category id format"),
    validatorMiddlware
]
exports.deleteSubCategoryValidator = [
    param("id")
        .isMongoId()
        .withMessage("Invalid subCategory id format"),
    validatorMiddlware
]