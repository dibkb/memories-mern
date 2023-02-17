import express from "express";
import {
  signupUser,
  loginUser,
  validateEmail,
  getProfile,
  logoutUser,
} from "../controller/usersController.js";
export const userRouter = express.Router();
userRouter.post("/signup", signupUser);
userRouter.post("/validateemail", validateEmail);
userRouter.get("/profile", getProfile);
userRouter.post("/login", loginUser);
userRouter.post("/logout", logoutUser);
