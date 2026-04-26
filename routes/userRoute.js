const { Router } = require("express");
const controller = require("../controllers/userController");
const authController = require("../controllers/authController");

const {createUserValidator,
       deleteUserValidator , 
       updateUserValidator ,
       getUserValidator , 
       updatePasswordValidator,
       updateLoggedUserValidator
} = require("../utils/validators/userValidator");



const router = Router();


router.get("/getMe" , authController.protect , controller.getLoggedUserData , controller.getUser );
router.put("/changeLoggedUserPassword" ,  authController.protect , controller.updateLoggedUserPassword);
router.put("/updateMe" ,  authController.protect , updateLoggedUserValidator , controller.updateLoggedUserData);

router.route("/")
    .post(controller.uploadUserImage  , controller.resizeImage , createUserValidator , controller.createUser)
    .get(controller.getUsers);
router.route("/:id")
    .get( getUserValidator , controller.getUser)
    .put( updateUserValidator , controller.updateUser)
    .delete( deleteUserValidator , controller.deleteUser);
router.put("/changePassword/:id" , updatePasswordValidator , controller.changeUserPassword);


module.exports = router;