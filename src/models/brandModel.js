import mongoose from "mongoose";

const brandSchema = new mongoose.Schema({
    brandName:{
        type: String,
        required: true
    },

    brandDescription: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now(),
        required: true
    }
})

const Brand = mongoose.model("Brand", brandSchema)

export default Brand