const { Router } = require("express");
const controller = require("../controllers/productController");


const{
    getProductValidator,
    createProductValidator,
    deleteProductValidator,
    updateProductValidator
}=require("../utils/validators/productValidator");



const router = Router();


router.route("/")
    .post(controller.uploadProductImages , controller.resizeProductImages ,createProductValidator, controller.createProduct)
    .get(controller.getProducts);
router.route("/:id")
    .get(getProductValidator,controller.getProduct)
    .put(controller.uploadProductImages , controller.resizeProductImages ,updateProductValidator,controller.updateProduct)
    .delete( deleteProductValidator,controller.deleteProduct);

module.exports = router;