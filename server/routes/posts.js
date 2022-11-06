import express from "express";
import { getPosts, createPosts } from "../controller/postsController.js";
export const postRouter = express.Router();
postRouter.get("/", getPosts);
postRouter.post("/", createPosts);
