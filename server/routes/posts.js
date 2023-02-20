import express from "express";
import { getPosts, createPost } from "../controller/postsController.js";
export const postRouter = express.Router();
postRouter.get("/", getPosts);
postRouter.post("/", createPost);
