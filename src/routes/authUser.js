import express from "express";
import { userRegister, userLogin, userDelete, getUser, updateUser } from "../controller/authLogin.js";
import middleware from "../middleware/adminMiddleware.js";
import { brandRegister } from "../controller/brandController.js";
import { createSlot } from "../controller/slotManagement.js";
const router = express.Router();

router.post("/user_register",  userRegister);
router.post("/user_login",  userLogin);
router.delete("/user_delete/:userID", userDelete);
router.get("/user_get", middleware, getUser);
router.post("/update_user", middleware, updateUser);
router.post("/brand_register", brandRegister)
router.post("/add_slot", createSlot)

export default router;
