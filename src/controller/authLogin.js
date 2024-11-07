import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const userRegister = async (req, res) => {
    try {
        const { userID, userPassword, userCategory } = req.body;

        if (!userID || !userPassword || !userCategory) {
            return res.status(400).json({
                message: "Missing required fields",
                success: false
            });
        }

        const checkUser = await User.findOne({ userID });
        if (checkUser) {
            return res.status(409).json({  
                message: "User already registered",
                success: false
            });
        }

        const hashPassword = await bcrypt.hash(userPassword, 10);

        const newUser = new User({
            userID,
            userPassword: hashPassword,
            userCategory
        });

        await newUser.save();

        res.status(201).json({  
            message: "User registered successfully",
            success: true
        });

    } catch (error) {
        console.error("Error during registration:", error);  
        res.status(500).json({  
            message: "Internal server error",
            success: false
        });
    }
};


export const userLogin = async (req, res) => {
    try {
        const { userID, userPassword } = req.body;  

        const validUser = await User.findOne({ userID });  

        if (!validUser) {
            return res.status(500).json({
                message: "Invalid UserID",
                success: false
            });
        }

        const validPassword = await bcrypt.compare(userPassword, validUser.userPassword);  
        if (!validPassword) {
            return res.status(500).json({
                message: "Invalid Password",
                success: false
            });
        }

        const payload = {
            id: validUser.id,  
            userCategory: validUser.userCategory  
        };

        const token = jwt.sign(payload, "Aditya", { expiresIn: "3h" });
        res.cookie("token", token);

        res.status(200).json({
            message: "User logged in",
            success: true,
            token
        });

    } catch (error) {
        res.status(400).json({
            message: "Internal Server Error",
            success: false  
        });
    }
};

export const userDelete = async (req, res) => {
    try {
        const userID = req.params.userID;  

        const validDelete = await User.findByIdAndDelete(userID);  

        if (!validDelete) {
            return res.status(404).json({  
                message: "User not found",
                success: false
            });
        }

        res.status(200).json({ 
            message: "User deleted successfully", 
            success: true 
        });

    } catch (error) {
        res.status(500).json({  
            message: "Internal Server Error", 
            success: false 
        });
    }
};

export const getUser = async (req, res) => {
    try {
        const userID = req.user.id
        const findUser = await User.findById(userID)
        if(!findUser){
            res.status(400).json({
                message: "User not found",
                success: false
            })
        }
        res.status(200).json({
            message: "user found",
            success: true,
            findUser
        })
    } catch (error) {
        res.status(400).json({
            message: "internal server error",
            success: false
        })
    }
}

export const updateUser = async (req, res) => {
    try {
        const userId = req.user.id
        const update = await User.findByIdAndUpdate(userId)
        
        if(!update){
            res.status(400).json({
                message: "user not found",
                success: false
            })
        }
        res.status(200).json({
            message: "user updates successfully",
            success: true,
            update
        })
    } catch (error) {
        res.status(500).json({
            message: "internal server error",
            success: false
        })
    }
}