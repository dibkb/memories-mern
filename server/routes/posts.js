import express from "express";
import {
  getPosts,
  createPost,
  likePost,
} from "../controller/postsController.js";
export const postRouter = express.Router();
postRouter.get("/", getPosts);
postRouter.post("/", createPost);
postRouter.patch("/:id/likePost", likePost);
