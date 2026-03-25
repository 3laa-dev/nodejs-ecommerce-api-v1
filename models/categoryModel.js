const { Schema, model } = require("mongoose");


const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Category required"],
      unique: [true, "Category must be unique"],
      minLength: [3, "Too short category name"],
      maxLength: [32, "Too long category name"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image:String 
  },
  { timestamps: true },
  
);

const setImageUrl = doc=> {
  if(doc.image){
    doc.image = `${process.env.BASE_URL}/categories/${doc.image}`;
  }

}
categorySchema.post("init" , setImageUrl)
categorySchema.post('save', setImageUrl);

const CategoryModel = model("Category", categorySchema);

module.exports = CategoryModel;
