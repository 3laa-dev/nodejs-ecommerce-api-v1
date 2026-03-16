
const router  = require("express").Router({mergeParams:true});
const addCategoryIdToBody = require("../middlewares/addCategoryIdToBody");

const{
    createSubCategory,
    getSubCategories,
    getSubCategory,
    updateSubCategory,
    deleteSubCategory
    
} = require("../controllers/subCategoryController");
const{
    createSubCategoryValidator,
    getSubCategoryValidator,
    updateSubCategoryValidator,
    deleteSubCategoryValidator
} = require("../utils/validators/subCategoryValidator");



router.route("/")
    .post(createSubCategoryValidator, addCategoryIdToBody ,createSubCategory)
    .get(getSubCategories);
router.route("/:id")
    .get(getSubCategoryValidator,getSubCategory)
    .put(updateSubCategoryValidator , updateSubCategory)
    .delete(deleteSubCategoryValidator , deleteSubCategory);


module.exports = router;