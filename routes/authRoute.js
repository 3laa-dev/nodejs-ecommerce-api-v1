const controller = require("../controllers/authController");
const router = require("express").Router();
const {signupValidator , loginValidator} = require("../utils/validators/authValidator")

router.post("/signup" , signupValidator  ,  controller.signup);
router.post("/login" , loginValidator,   controller.login);

module.exports = router