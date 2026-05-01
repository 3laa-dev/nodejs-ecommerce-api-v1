const { Schema, model } = require("mongoose");

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

reviewSchema.pre(/^find/ , function(){
    this.populate({path:"user" ,select:"name"});
    
})
module.exports = model('review', reviewSchema);