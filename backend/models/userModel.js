const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a  name"]
    },
    email: {
        type: String,
        required: [true, "Please add an email"],
        unique: [true]
    },
    password: {
        type: String,
        required: [true, "Please add a password"]
    },
    role: {
        type: String,
        enum: ["admin", "moderator", "user"],
        default: "user"
    }
},
{
    timestamps: true,
    collection: process.env.USERS_DB_NAME
})

module.exports = mongoose.model("User", userSchema)