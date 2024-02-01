const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Please add a first name"]
    },
    lastName: {
        type: String,
        required: [true, "Please add a last name"]
    },
    email: {
        type: String,
        required: [true, "Please add an email"],
        unique: [true]
    },
    password: {
        type: String,
        required: [false, "Please add a password"]
    },
    role: {
        type: String,
        enum: ["admin", "dealer", "tulu", "user"],
        default: "user"
    },
    type: {
        type: String,
        enum: ["google"],
        default: "google"
    }
},
{
    timestamps: true,
    collection: process.env.USERS_DB_NAME
})

module.exports = mongoose.model("GoogleUser", userSchema)