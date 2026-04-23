const controller = require("../controllers/authController");
const router = require("express").Router();
const {createUserValidator} = require("../utils/validators/authValidator")

router.post("/signup" , createUserValidator ,  controller.signup);
router.post("/login" ,   controller.login);

module.exports = router