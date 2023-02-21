import jwt from "jsonwebtoken";
import { UsersModel } from "../models/usersModel.js";
import { PostMessage } from "../models/postMessage.js";
export const getPosts = async (req, res) => {
  const page = parseInt(req.query.page || 0);
  const PAGE_SIZE = 6;
  try {
    const postMessages = await PostMessage.find()
      .sort({ _id: -1 })
      .limit(PAGE_SIZE)
      .skip(PAGE_SIZE * page);
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json(error.message);
  }
};
export const createPost = async (req, res) => {
  const { title, description, selectedFile } = req.body;
  const { token } = req.cookies;
  try {
    const userInfo = jwt.verify(token, process.env.JWT_KEY);
    const user = await UsersModel.getById(userInfo._id);
    const newPost = new PostMessage({
      title: title,
      message: description,
      selectedFile: selectedFile,
      creatorName: user.firstName + " " + user.lastName,
      creatorImage: user.image,
      creator: user,
    });
    await newPost.save();
    res.status(201).send("new post created sucessfully");
  } catch (error) {
    res.status(404).json(error.message);
  }
};
