import mongoose from "mongoose";

const connection = async() => {
    try {
        await mongoose.connect("mongodb://localhost:27017/qrDatabase")
        console.log("database connected")
    } catch (error) {
        console.log("internal server error")
    }
}

export default connection