const { Schema, model } = require("mongoose");
const Product =require("./productModel");

const reviewSchema = new Schema(
    {
        title: String,
        ratings: {
            type: Number,
            min: [1, "Min Number Of Ratings is One"],
            max: [5, "Min Number Of Ratings is Five"],
            required: [true, "review ratings requied"]
        },
        user: {
            type: Schema.ObjectId,
            ref: "user",
            required: [true, "Review must belong to user"]
        },
        product: {
            type: Schema.ObjectId,
            ref: "product",
            required: [true, "Review must belong to product"]
        }
    },
    {
        timestamps: true
    }
)

reviewSchema.statics.calcAverageRatingsAndQuantity = async function (productId) {
    const result = await this.aggregate([
        {
            $match: { product: productId }
        },
        {
            $group: {
                _id: "$product",
                avgRatings: { $avg: "$ratings" },
                ratingsQuantity: { $sum: 1 }
            }
        }
    ])
    if (result.length > 0) {
        await Product.findByIdAndUpdate(productId, {
            ratingsAverage: result[0].avgRatings,
            ratingsQuantity: result[0].ratingsQuantity,
        });
    } else {
        await Product.findByIdAndUpdate(productId, {
            ratingsAverage: 0,
            ratingsQuantity: 0,
        });
    }
}

reviewSchema.post('save', async function () {
    await this.constructor.calcAverageRatingsAndQuantity(this.product);
});
reviewSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await doc.constructor.calcAverageRatingsAndQuantity(doc.product);
    }
});
reviewSchema.pre(/^find/, function () {
    this.populate({ path: "user", select: "name" });

})
module.exports = model('review', reviewSchema);