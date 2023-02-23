import express from "express";
import {
  signupUser,
  loginUser,
  validateEmail,
  getProfile,
  logoutUser,
  getProfileById,
  getProfilePosts,
  deleteUserPost,
} from "../controller/usersController.js";
export const userRouter = express.Router();
userRouter.post("/signup", signupUser);
userRouter.post("/validateemail", validateEmail);
userRouter.get("/profile", getProfile);
userRouter.get("/:id", getProfileById);
userRouter.get("/:id/posts", getProfilePosts);
userRouter.delete("/posts/:id", deleteUserPost);
userRouter.post("/login", loginUser);
userRouter.post("/logout", logoutUser);
