const { Router } = require("express");
const controller = require("../controllers/brandController");


const {
    getBrandValidator,
    createBrandValidator,
    deleteBrandValidator,
    updateBrandValidator,
} = require("../utils/validators/brandValidator");



const router = Router();



router.route("/")
    .post(controller.uploadBrandImage  , controller.resizeImage , createBrandValidator, controller.createBrand)
    .get(controller.getBrands);
router.route("/:id")
    .get(getBrandValidator, controller.getBrand)
    .put(updateBrandValidator, controller.updateBrand)
    .delete(deleteBrandValidator, controller.deleteBrand);

module.exports = router;