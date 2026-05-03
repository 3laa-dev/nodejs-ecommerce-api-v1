const { Router } = require("express");
const controller = require("../controllers/reviewController");
const { createReviewValidator,
    getReviewValidator,
    updateReviewValidator,
    deleteReviewValidator
} = require("../utils/validators/reviewValidator")
const auth = require("../controllers/authController");




const router = Router({ mergeParams: true });

const createFilterObject = (req, res, next) => {
    if (req.params.productId)
        req.filter = { product: req.params.productId };
    next();
}

const addProductIdToBody = (req, res, next) => {
    const { product } = req.body;
    if (!product)
        req.body.product = req.params.productId;
    next();
}

router.route("/")
    .post(auth.protect, auth.allowedTo("user"),
        (req, res, next) => { req.body.user = req.user._id; next(); },
        addProductIdToBody,
        createReviewValidator,
        controller.createReview)
    .get(createFilterObject, controller.getReviews);
router.route("/:id")
    .get(getReviewValidator, controller.getReview)
    .put(auth.protect, auth.allowedTo("user"),
        (req, res, next) => { req.body.user = req.user._id; next(); },
        updateReviewValidator,
        controller.updateReview)
    .delete(auth.protect, auth.allowedTo("user", "manager", "admin"), deleteReviewValidator, controller.deleteReview);

module.exports = router;