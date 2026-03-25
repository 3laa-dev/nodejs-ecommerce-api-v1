const { Schema, model } = require("mongoose");

const brandSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "brand required"],
      unique: [true, "brand must be unique"],
      minLength: [3, "Too short brand name"],
      maxLength: [32, "Too long brand name"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: String
  },
  { timestamps: true },

);

const setImageUrl = doc => {
  if (doc.image) {
    const imageUrl = `${process.env.BASE_URL}/brands/${doc.image}`
    doc.image = imageUrl;
  }

}
brandSchema.post("init", setImageUrl)
brandSchema.post('save', setImageUrl);

const brandModel = model("Brand", brandSchema);


module.exports = brandModel;
