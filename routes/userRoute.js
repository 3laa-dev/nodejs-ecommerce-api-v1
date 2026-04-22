const { Router } = require("express");
const controller = require("../controllers/userControl");

const {createUserValidator,
       deleteUserValidator , 
       updateUserValidator ,
       getUserValidator , 
       updatePasswordValidator
} = require("../utils/validators/userValidator");



const router = Router();



router.route("/")
    .post(controller.uploadUserImage  , controller.resizeImage , createUserValidator , controller.createUser)
    .get(controller.getUsers);
router.route("/:id")
    .get( getUserValidator , controller.getUser)
    .put( updateUserValidator , controller.updateUser)
    .delete( deleteUserValidator , controller.deleteUser);
router.put("/changePassword/:id" , updatePasswordValidator , controller.changeUserPassword);

module.exports = router;