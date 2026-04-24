const { Router } = require("express");
const controller = require("../controllers/categoryController");
const authController = require("../controllers/authController");

const {
    getCategoryValidator,
    createCategoryValidator,
    deleteCategoryValidator,
    updateCategoryValidator,
} = require("../utils/validators/categoryValidator");

const subCategoryRoute = require("../routes/subCategoryRoute");

const router = Router();

router.use("/:categoryId/subCategories" , subCategoryRoute);




router.route("/")
    .post(
        authController.protect ,
        authController.allowedTo("admin" , "manager") , 
        controller.uploadCategoryImage ,
         controller.resizeImage , 
         createCategoryValidator,
         controller.createCategory
        )
    .get(controller.getCategories);
router.route("/:id")
    .get(getCategoryValidator, controller.getCategory)
    .put(controller.uploadCategoryImage , controller.resizeImage  , updateCategoryValidator, controller.updateCategory)
    .delete(deleteCategoryValidator, controller.deleteCategory);

module.exports = router;