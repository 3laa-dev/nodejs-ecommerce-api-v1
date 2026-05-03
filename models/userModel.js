const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");


const userSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: [true, "name required"]
        },
        slug: {
            type: String,
            lowercase: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        phone: String,
        profileImage: String,
        password: {
            type: String,
            requierd: [true, "password is required"],
            minlength: [8, "too short password"]
        },
        passwordChangedAt: Date,
        passwordResetCode: String,
        passwordResetExpires: Date,
        passwordResetVerified: Boolean,
        role: {
            type: String,
            enum: ["admin", "manager", "user"],
            default: "user"
        },
        wishlist:[
            {
                type:Schema.ObjectId,
                ref:"Product"
            }
        ],
        addresses:[
            {
                id:{type:Schema.Types.ObjectId},
                alias:String , 
                details:String , 
                phone:String , 
                sity:String ,
                postalCode:String 
            }
        ]
    }, { timestamps: true });

userSchema.pre("save", async function (next) {
    this.password = await bcrypt.hash(this.password, 10);
})

module.exports = model("user", userSchema);