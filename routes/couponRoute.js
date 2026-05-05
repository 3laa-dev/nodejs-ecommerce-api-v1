const { Router } = require("express");
const controller = require("../controllers/couponController");
const auth = require ("../controllers/authController");

const router = Router();


router.use(auth.protect , auth.allowedTo("admin" , "manager"));

router.route("/")
    .post(controller.createCoupon)
    .get(controller.getCoupons);
router.route("/:id")
    .get( controller.getCoupon)
    .put(controller.updateCoupon)
    .delete(controller.deleteCoupon);

module.exports = router;