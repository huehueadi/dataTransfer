import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true
    },

    userPassword: {
        type: String,
        required: true
    },

    userCategory: {
        type: String,
        required: true
    }
})

const User = mongoose.model("User", UserSchema)

export default User