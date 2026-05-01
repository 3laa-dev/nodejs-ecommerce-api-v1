const { Router } = require("express");
const controller = require("../controllers/reviewController");
const { createReviewValidator,
    getReviewValidator,
    updateReviewValidator , 
    deleteReviewValidator
} = require("../utils/validators/reviewValidator")
const auth = require("../controllers/authController");




const router = Router({mergeParams:true});



router.route("/")
    .post(auth.protect, auth.allowedTo("user"),
        (req, res, next) => { req.body.user = req.user._id; next(); },
        createReviewValidator,
        controller.createReview)
    .get(  controller.getReviews);
router.route("/:id")
    .get( getReviewValidator  , controller.getReview)
    .put(auth.protect, auth.allowedTo("user"),
        (req, res, next) => { req.body.user = req.user._id; next(); },
        updateReviewValidator ,
         controller.updateReview)
    .delete(auth.protect, auth.allowedTo("user", "manager", "admin") , deleteReviewValidator, controller.deleteReview);

module.exports = router;