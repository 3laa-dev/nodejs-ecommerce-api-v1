const validatorMiddlware = require("../../middlewares/validatorMiddleware");
const { param, body } = require("express-validator");
const slugify = require("slugify");

exports.getCategoryValidator = [
    param("id")
        .isMongoId()
        .withMessage("Invalid category id format"),
    validatorMiddlware
]
exports.createCategoryValidator = [
    
    
    body("name")
        .notEmpty()
        .withMessage("Category required")
        .isLength({ min: 3 })
        .withMessage("Too short category name")
        .isLength({ max: 32 })
        .withMessage("Too long category name")
        .custom((val , {req})=>{
                    req.body.slug = slugify(val)
                    return true;
                }),
    validatorMiddlware
]
exports.updateCategoryValidator = [
    param("id")
        .isMongoId()
        .withMessage("Invalid category id format"),
    body("name")
        .optional()
        .notEmpty()
        .withMessage("Category required")
        .isLength({ min: 3 })
        .withMessage("Too short category name")
        .isLength({ max: 32 })
        .withMessage("Too long category name")
        .custom((val , {req})=>{
                    req.body.slug = slugify(val)
                    return true;
                }),
    validatorMiddlware
]

exports.deleteCategoryValidator = [
    param("id")
        .isMongoId()
        .withMessage("Invalid category id format"),
    validatorMiddlware
]