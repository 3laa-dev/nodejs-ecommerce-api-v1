const  slugify  = require("slugify");
const validatorMiddlware = require("../../middlewares/validatorMiddleware");
const { param, body } = require("express-validator");


exports.getBrandValidator = [
    param("id")
        .isMongoId()
        .withMessage("Invalid category id format"),
    validatorMiddlware
]
exports.createBrandValidator = [
    
    
    body("name")
        .notEmpty()
        .withMessage("Brand required")
        .isLength({ min: 3 })
        .withMessage("Too short Brand name")
        .isLength({ max: 32 })
        .withMessage("Too long Brand name")
        .custom((val , {req})=>{
                    req.body.slug = slugify(val)
                    return true;
                }),
    validatorMiddlware
]
exports.updateBrandValidator = [
    param("id")
        .isMongoId()
        .withMessage("Invalid Brand id format"),
    body("name")
        .notEmpty()
        .withMessage("Brand required")
        .isLength({ min: 3 })
        .withMessage("Too short Brand name")
        .isLength({ max: 32 })
        .withMessage("Too long Brand name")
        .custom((val , {req})=>{
            req.body.slug = slugify(val)
            return true;
        }),
    validatorMiddlware
]

exports.deleteBrandValidator = [
    param("id")
        .isMongoId()
        .withMessage("Invalid Brand id format"),
    validatorMiddlware
]