const multer = require("multer");
const _Error = require("../utils/Error");

function multerOptions(){
    // const storage = multer.diskStorage({
    //     destination:function(req , file , cb){
    //         cb(null , "uploads/categories");
    //     },
    //     filename:function(req , file , cb){
    //         const ext = file.mimetype.split("/")[1];
    //         cb(null , `category-${guid.create()}.${ext}`);
    //     }
    // })
    const storage = multer.memoryStorage();
    
    const fileFilter = function (req, file, cb) {
        const type = file.mimetype.split("/")[0];
        if (type === "image")
            cb(null, true);
        else
            cb(new _Error("Only image allowed"), 400);
    }
    
    
    
    const upload = multer({ storage, fileFilter })
    return upload;
}

exports.uploadSingleImage = (fieldname) => {
    
    const upload=multerOptions();
    return upload.single(fieldname);
}

exports.uploadMixOfImages = (arrayOfFieldes)=>{
    
    const upload=multerOptions();
    return upload.fields(arrayOfFieldes);
}