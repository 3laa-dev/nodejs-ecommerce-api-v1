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
    .post(createProductValidator, controller.createProduct)
    .get(controller.getProducts);
router.route("/:id")
    .get(getProductValidator,controller.getProduct)
    .put(updateProductValidator,controller.updateProduct)
    .delete( deleteProductValidator,controller.deleteProduct);

module.exports = router;