// So we provided a modelName which is User 
// Mongoose automatically converts "User" to "users" by making it lowercase and ploral (It is following MngoDB's convention)
// The documents will be stored in a MongoDB collection names "users"
// So there is no need to worry and no need to wonder how the fck it created collection named "users", "contacts" as you didn't even mentioned it once

const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
        user_id:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        username:{
            type: String,
            required: [true, "Please enter the username"],
            minlength: 4,
            maxlength: 20
        },
        email: {
            type: String,
            required: [true, "Please enter the email"],
            unique: true,
            match: [
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                "Please enter a valid email address"
            ]
        }
        ,
        password:{
            type:String,
            required: [true, "Please enter the Password"],
            minlength: 8
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("User", userSchema);