
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

const createFilterObject = (req , res , next)=>{
        if(req.params.categoryId)
            req.filter = {category : req.params.categoryId};
        next();
}


router.route("/")
    .post(createSubCategoryValidator, addCategoryIdToBody ,createSubCategory)
    .get(createFilterObject,getSubCategories);
router.route("/:id")
    .get(getSubCategoryValidator,getSubCategory)
    .put(updateSubCategoryValidator , updateSubCategory)
    .delete(deleteSubCategoryValidator , deleteSubCategory);


module.exports = router;