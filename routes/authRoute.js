const controller = require("../controllers/authControl");
const router = require("express").Router();
const {createUserValidator} = require("../utils/validators/authValidator")

router.post("/signup" , createUserValidator ,  controller.signup);

module.exports = router