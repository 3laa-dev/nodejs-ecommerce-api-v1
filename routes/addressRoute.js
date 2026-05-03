
const router = require("express").Router();
const controller = require("../controllers/addressController");
const auth = require("../controllers/authController");

router.post("/", auth.protect, controller.addAddress);
router.delete("/:id", auth.protect, controller.deleteAddress);
router.get("/getMyAddresses", auth.protect, controller.getLoggedUserAddresses)

module.exports = router;