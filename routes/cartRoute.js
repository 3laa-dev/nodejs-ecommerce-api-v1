const router = require("express").Router();
const controller = require("../controllers/cardController")
const auth = require("../controllers/authController");

router.use(auth.protect , auth.allowedTo("user"))
router
    .route("/")
    .post(controller.addProductToCart)
    .get(controller.getLoggedUserCart)
    .delete(controller.clearCart);
router.put("/applyCoupon" , controller.applyCoupon);
router
    .route("/:id")
    .delete(controller.deleteSpecificCartItem)
    .put(controller.updateCartItemQuantity);

router.put("/applyCoupon" , controller.applyCoupon);
module.exports = router;