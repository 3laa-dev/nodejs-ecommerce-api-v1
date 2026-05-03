
const validatorMiddlware = require("../../middlewares/validatorMiddleware");
const { param, body } = require("express-validator");
const Review = require("../../models/reviewModel");


exports.getReviewValidator = [
    param("id")
        .isMongoId()
        .withMessage("Invalid Review id format"),
    validatorMiddlware
]
exports.createReviewValidator = [


    body("title")
        .optional(),
    body("ratings")
        .notEmpty()
        .withMessage("Ratings value required")
        .isFloat({ min: 1, max: 5 })
        .withMessage("Ratings value must be between 1 and 5"),
    body("product")
        .isMongoId()
        .withMessage("Product id is invalid")
        .custom(async (val, { req }) => {
            const review = await Review.findOne({ user: req.body.user, product: req.body.product });
            if (review)
                throw new Error("You Already add review to this product");
            return true;
        })
    ,
    validatorMiddlware
]
exports.updateReviewValidator = [
    param("id")
        .isMongoId()
        .withMessage("Invalid Review id format")
        .custom(async (val, { req }) => {
            const review = await Review.findById(val);
            if (!review)
                throw new Error("No Review for this id");
            if (req.body.user.toString() !== review.user._id.toString())
                throw new Error("Tou are not allowed to update this review");
            return true;
        }),
    validatorMiddlware
]

exports.deleteReviewValidator = [
    param("id")
        .isMongoId()
        .withMessage("Invalid Brand id format")
        .custom(async (val, { req }) => {
            const rev = await Review.findOne({ _id: val })
            if (req.user.role === "user") {
                if (!rev) {
                    throw new Error("Review not found");
                }
                if (rev.user._id.toString() !== req.user._id.toString())
                    throw new Error("You are not allowed to delete this review");
            }
            return true;
        })
    ,
    validatorMiddlware
]