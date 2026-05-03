
const router = require("express").Router();
const controller = require("../controllers/wishlistController");
const auth = require("../controllers/authController");

router.post("/", auth.protect, controller.addProductToWishlist);
router.delete("/:id", auth.protect, controller.deleteProductFromWishlist);
router.get("/getMyWishlist", auth.protect, controller.getLoggedUserWishlist)

module.exports = router;