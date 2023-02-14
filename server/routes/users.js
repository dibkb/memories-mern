import express from "express";
import {
  signupUser,
  loginUser,
  validateEmail,
} from "../controller/usersController.js";
export const userRouter = express.Router();
userRouter.post("/signup", signupUser);
userRouter.post("/validateemail", validateEmail);
userRouter.post("/login", loginUser);
