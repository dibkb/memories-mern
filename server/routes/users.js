import express from "express";
import { signupUser, loginUser } from "../controller/usersController.js";
export const userRouter = express.Router();
userRouter.post("/signup", signupUser);
userRouter.post("/login", loginUser);
