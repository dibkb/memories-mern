import jwt from "jsonwebtoken";
import { UsersModel } from "../models/usersModel.js";
import { PostMessage } from "../models/postMessage.js";
export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
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
      selectedFile: selectedFile.base64,
      creator: `${user.firstName} ${user.lastName}`,
    });
    await newPost.save();
    res.status(201).send("new post created sucessfully");
  } catch (error) {
    res.status(404).json(error.message);
  }
};
