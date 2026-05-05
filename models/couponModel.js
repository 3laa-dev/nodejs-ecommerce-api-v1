const {Schema , model} = require("mongoose");


const couponSchema = new Schema({
    name:{
        type:String , 
        trim:true , 
        unique:true ,
        required:[true , "Coupon name required"]
    },
    expire:{
        type:Date,
        required:[true , "Coupon Expire Time Requried"]
    },  
    discount:{
        type:Number , 
        required:["Coupon Discount Value Required"]
    }
},
{
    timestamps:true
})

module.exports = model("coupon" , couponSchema);
