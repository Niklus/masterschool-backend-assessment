import express from "express";
import * as userCtrl from "../controllers/userController.js";
import auth from "../middleware/authMiddleware.js";

export const userRouter = express.Router();

userRouter.post("/register", userCtrl.registerUser);
userRouter.post("/login", userCtrl.loginUser);
userRouter.get("/me", auth, userCtrl.getMe);
