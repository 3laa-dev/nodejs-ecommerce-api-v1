const router = require("express").Router();
const controller = require("../controllers/cardController")
const auth = require("../controllers/authController");

router.use(auth.protect , auth.allowedTo("user"))
router
    .route("/")
    .post(controller.addProductToCart)
    .get(controller.getLoggedUserCart)
    .delete(controller.clearCart);
router
    .route("/:id")
    .delete(controller.deleteSpecificCartItem)
    .put(controller.updateCartItemQuantity);
module.exports = router;