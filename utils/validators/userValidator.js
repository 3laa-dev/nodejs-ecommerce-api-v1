const slugify = require("slugify");
const bcrypt = require("bcrypt");

const validatorMiddlware = require("../../middlewares/validatorMiddleware");
const { param, body } = require("express-validator");
const User = require("../../models/userModel")

exports.getUserValidator = [
    param("id")
        .isMongoId()
        .withMessage("Invalid category id format"),
    validatorMiddlware
]
exports.createUserValidator = [


    body("name")
        .notEmpty()
        .withMessage("User required")
        .isLength({ min: 3 })
        .withMessage("Too short User name")
        .custom((val, { req }) => {
            req.body.slug = slugify(val)
            return true;
        }),
    body("email")
        .notEmpty()
        .withMessage("Email required")
        .isEmail()
        .withMessage("invalid email address")
        .custom(async val => {
            await User.findOne({ email: val })
                .then(user => {
                    if (user)
                        return Promise.reject(new Error("Email already in user"));
                })

        }),
    body("passwordConfirm")
        .notEmpty()
        .withMessage("Password confirmation is required"),
    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters")
        .custom((val, { req }) => {
            if (val !== req.body.passwordConfirm)
                throw new Error("Passord confirmation incorret")
            return true
        }),

    validatorMiddlware
]
exports.updateUserValidator = [
    param("id")
        .isMongoId()
        .withMessage("Invalid User id format"),

    body("name")
        .optional()
        .notEmpty()
        .withMessage("User required")
        .isLength({ min: 3 })
        .withMessage("Too short User name")
        .custom((val, { req }) => {
            req.body.slug = slugify(val)
            return true;
        }),
    body("email")
        .optional()
        .notEmpty()
        .withMessage("Email required")
        .isEmail()
        .withMessage("invalid email address")
        .custom(async val => {
            await User.findOne({ email: val })
                .then(user => {
                    if (user)
                        return Promise.reject(new Error("Email already in user"));
                })

        }),
    body("password")
        .optional()
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters"),

    validatorMiddlware
]

exports.updatePasswordValidator = [
    body("currentPassword")
        .notEmpty()
        .withMessage("current password is required"),
    body("confirmPassword")
        .notEmpty()
        .withMessage("confirm password is required"),
    body("password")
        .notEmpty()
        .withMessage("password is required")
        .custom(async (val, { req }) => {
            if (req.body.password !== req.body.confirmPassword)
                throw new Error("Password confirmation incorret")
            const user = await User.findById(req.params.id);
            if (!user)
                throw new Error("this user is not exists")
            const isTruePassword = await bcrypt.compare(req.body.currentPassword, user.password);
            if (!isTruePassword)
                throw new Error("Incorrect password")
            return true ;
        }),
        validatorMiddlware
]

exports.deleteUserValidator = [
    param("id")
        .isMongoId()
        .withMessage("Invalid User id format"),
    validatorMiddlware
]