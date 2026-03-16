const Category = require("../models/categoryModel");
const _Error = require("../utils/Error");
const factory = require("./handlersFactory");
const multer  = require("multer");
const guid = require("guid");

const storage = multer.diskStorage({
    destination:function(req , file , cb){
        cb(null , "uploads/categories");
    },
    filename:function(req , file , cb){
        const ext = file.mimetype.split("/")[1];
        cb(null , `${guid.create()}.${ext}`);
    }
})

const fileFilter = function(req , file , cb){
    const type = file.mimetype.split("/")[0];
    if(type === "image")
        cb(null , true);
    else
        cb (new _Error("Only image allowed") , 400);
}


const upload = multer({storage,fileFilter})

exports.uploadCategoryImage = upload.single("image");

exports.createCategory = factory.createOne(Category);

exports.getCategories = factory.getAll(Category);

exports.getCategory = factory.getOne(Category);

exports.updateCategory = factory.updateOne(Category)

exports.deleteCategory = factory.deleteOne(Category)