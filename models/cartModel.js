const { Schema, model } = require("mongoose");

const cartSchema = new Schema(
    {
        cartItems: [
            {
                product: {
                    ref: "Product",
                    type: Schema.ObjectId
                },
                quantity: {
                    type: Number,
                    default: 1
                },
                color: String,
                price: Number
            }
        ],
        totalCartPrice: Number,
        totalCartPriceAfterDiscount: Number,
        user: {
            type: Schema.ObjectId,
            ref: "user"
        }
    },
    {
        timestamps: true
    });
module.exports = model("cart", cartSchema)