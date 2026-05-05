const asyncHandler = require('express-async-handler');

const _Error = require("../utils/Error");
const Cart = require("../models/cartModel");
const Product = require("../models/productModel");
const Coupon = require("../models/couponModel");

const calcTotalCartPrice = (cart) => {
    let totalPrice = 0;
    cart.cartItems.forEach(item => totalPrice += item.quantity * item.price);
    return totalPrice
}

exports.addProductToCart = asyncHandler(async (req, res, next) => {
    const { productId, color } = req.body;

    const product = await Product.findById(productId);
    let cart = await Cart.findOne({ user: req.user._id });
    if (!product)
        return next(new _Error("This Product Not Found", 404));
    if (!cart) {
        cart = await Cart.create(
            {
                user: req.user._id,
                cartItems:
                    [{
                        product: productId,
                        color,
                        price: product.price
                    }],

            })
    } else {
        const productIndex = await cart.cartItems.findIndex(
            item => item.product.toString() === productId && item.color === color
        );

        if (productIndex > -1)
            cart.cartItems[productIndex].quantity += 1;
        else
            cart.cartItems.push({
                product: productId,
                color,
                price: product.price
            })
    }

    cart.totalCartPrice = calcTotalCartPrice(cart);
    cart.totalCartPriceAfterDiscount = undefined;
    await cart.save();
    res.status(201).json({ status: "success", data: { cart } });
})

exports.getLoggedUserCart = asyncHandler(async (req, res, next) => {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart)
        return next(new _Error("There is no cart for you", 404));

    res.status(200).json({ status: "success", data: cart })

})

exports.deleteSpecificCartItem = asyncHandler(async (req, res, next) => {
    const cart = await Cart.findOneAndUpdate(
        { user: req.user._id },
        { $pull: { cartItems: { _id: req.params.id } } },
        { returnDocument: "after" }
    );
    cart.totalCartPrice = calcTotalCartPrice(cart);
    cart.save();
    res.status(200).json({ status: "success", data: cart })
})

exports.clearCart = asyncHandler(async (req, res, next) => {
    await Cart.findOneAndDelete({ user: req.user._id });
    res.status(204).send();
})

exports.updateCartItemQuantity = asyncHandler(async (req, res, next) => {
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart)
        return next(new _Error("There is no cart for you", 404));

    const productIndex = cart.cartItems.findIndex(
        item => item._id.toString() === req.params.id
    )

    if (productIndex > -1)
        cart.cartItems[productIndex].quantity = req.body.quantity;
    else
        return next(new _Error("this item is not exist", 404))


    cart.totalCartPrice = calcTotalCartPrice(cart);
    cart.totalCartPriceAfterDiscount = undefined;
    await cart.save();

    res.status(201).json({ status: "success", data: { cart } });
})

exports.applyCoupon = asyncHandler(async (req, res, next) => {
    const coupon = await Coupon.findOne({ name: req.body.coupon, expire: { $gt: Date.now() } });
    const cart = await Cart.findOne({ user: req.user._id })
    if (!cart)
        return next(new _Error("Your Cart Is Empty", 404));
    if (!coupon)
        return next(new _Error("Invalid Or Expired Coupon", 404));

    cart.totalCartPriceAfterDiscount = (cart.totalCartPrice - cart.totalCartPrice * coupon.discount / 100).toFixed(2);
    await cart.save();

    res.status(201).json({ status: "success", data: { cart } });
})