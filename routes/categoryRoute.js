const { Router } = require("express");
const controller = require("../controllers/categoryController");


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
    .post(controller.uploadCategoryImage ,createCategoryValidator,controller.createCategory)
    .get(controller.getCategories);
router.route("/:id")
    .get(getCategoryValidator, controller.getCategory)
    .put(updateCategoryValidator, controller.updateCategory)
    .delete(deleteCategoryValidator, controller.deleteCategory);

module.exports = router;