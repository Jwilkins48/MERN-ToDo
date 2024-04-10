import express from "express";
import { signUpUser, loginUser } from "../controllers/userController.js";

const router = express.Router();

// Register user - /api/user/signUp
router.post("/signUp", signUpUser);

// Login user - /api/user/login
router.post("/login", loginUser);

export default router;
