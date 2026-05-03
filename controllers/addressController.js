const asyncHandler = require('express-async-handler');
const User = require("../models/userModel");
const _Error = require("../utils/Error");

const addAddress = asyncHandler(async (req, res, next) => {
    const user = await User.findByIdAndUpdate(
        req.user._id,
        { $addToSet: { addresses: req.body } },
        { returnDocument: "after" }
    )
    res.status(200).json({ data: user })
})

const deleteAddress = asyncHandler(async (req, res, next) => {
    await User.findByIdAndUpdate(
        req.user._id,
        { $pull: { addresses: {_id:req.params.id} } },
        { returnDocument: "after" }
    )
     res.status(204).send()
})

const getLoggedUserAddresses = asyncHandler(async (req , res , next)=>{
    const loggedUser = await User.findById(req.user._id).populate("addresses")
    
    res.json({status:"success" , results:loggedUser.addresses.length , data:{wishlist:loggedUser.addresses}})
})

module.exports = {addAddress , deleteAddress , getLoggedUserAddresses };