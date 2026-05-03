// require("./reviewModel");

const { Schema, model } = require("mongoose");

const productSchema = Schema({
    title: {
        type: String,
        required: true,
        minlength: [2, "Too short product title"],
        maxlength: [100, "Too long product tilte"],
        trim: true,
        unique: [true, "product must be unique"],
    },
    slug: {
        type: String,
        required: true,
        lowercase: true
    },
    description: {
        type: String,
        minlength: [20, "Too short product description"],
        required: true
    },
    quantity: {
        type: Number,
        required: [true, "Quantity is required"]
    },
    sold: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
        max: 1000000
    },
    priceAfterDiscount: {
        type: Number
    },
    colors: {
        type: [String]
    },
    imageCover: {
        type: String,
        required: [true, "product cover image is required"]
    },
    images: {
        type: [String]
    },
    category: {
        type: Schema.ObjectId,
        ref: "Category",
        required: true
    },
    subCategories: [
        {
            type: Schema.ObjectId,
            ref: "SubCategory"
        }
    ],
    brand: {
        type: Schema.ObjectId,
        ref: "Brand"
    },
    ratingsAverage: {
        type: Number,
        min: 1,
        max: 5,
    },
    ratingsQuantity: {
        type: Number,
        default: 0
    }
},
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    });

const setImageUrl = doc => {
    if (doc.imageCover) {
        doc.imageCover = `${process.env.BASE_URL}/products/${doc.imageCover}`;
    }
    if (doc.images) {
        let images = [];
        doc.images.forEach(image => {
            const imageUrl = `${process.env.BASE_URL}/products/${image}`
            images.push(imageUrl);
        })
        doc.images = images;
    }

}
productSchema.post("init", setImageUrl);
productSchema.post('save', setImageUrl);
productSchema.virtual("reviews" , {
  ref:"review",
  foreignField:"product",
  localField:"_id"
})
module.exports = model("Product", productSchema);