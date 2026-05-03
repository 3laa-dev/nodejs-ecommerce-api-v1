const asyncHandler = require('express-async-handler');
const User = require("../models/userModel");
const _Error = require("../utils/Error");

const addProductToWishlist = asyncHandler(async (req, res, next) => {
    const user = await User.findByIdAndUpdate(
        req.user._id,
        { $addToSet: { wishlist: req.body.product } },
        { returnDocument: "after" }
    )
    res.status(200).json({ data: user })
})

const deleteProductFromWishlist = asyncHandler(async (req, res, next) => {
    await User.findByIdAndUpdate(
        req.user._id,
        { $pull: { wishlist: req.params.id } },
        { returnDocument: "after" }
    )
     res.status(204).send()
})

const getLoggedUserWishlist = asyncHandler(async (req , res , next)=>{
    const loggedUserWishlist = await User.findById(req.user._id).populate("wishlist")
    
    res.json({status:"success" , results:loggedUserWishlist.wishlist.length , data:{wishlist:loggedUserWishlist.wishlist}})
})

module.exports = {addProductToWishlist , deleteProductFromWishlist , getLoggedUserWishlist};