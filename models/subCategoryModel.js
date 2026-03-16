const { Schema, model, } = require("mongoose");

const subCategorySchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            unique: [true, "SubCategory must be unique"],
            minlength: [2, "Too Short SubCategory name"],
            maxlength: [32, "Too Long SubCategory name"],
        },
        slug: {
            type: String,
            lowercase: true
        },
        category: {
            type: Schema.ObjectId,
            ref: 'Category',
            required: [true, "SubCategory must be belong to parent category"]
        },
        
    }, { timestamps: true }
);

module.exports = model("SubCategory", subCategorySchema);