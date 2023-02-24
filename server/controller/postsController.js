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
    const total = await PostMessage.countDocuments({});
    res.status(200).json({
      totalPages: Math.ceil(total / PAGE_SIZE),
      posts: postMessages,
    });
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
    res.status(201).send(newPost);
  } catch (error) {
    res.status(404).json(error.message);
  }
};
export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, description, selectedFile } = req.body;
  const { token } = req.cookies;
  try {
    const userInfo = jwt.verify(token, process.env.JWT_KEY);
    await PostMessage.findOneAndUpdate(
      {
        _id: id,
        creator: userInfo._id,
      },
      {
        title: title,
        message: description,
        selectedFile: selectedFile,
      }
    );
    res.status(200).send("Post updated sucessfully");
  } catch (error) {
    res.status(404).json(error.message);
  }
};
export const likePost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await PostMessage.findById(id);
    post.likeCount++;
    await PostMessage.findByIdAndUpdate(id, post);
    res.status(200).send("Post updated sucessfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
};
export const getPostById = async (req, res) => {
  const { id } = req.params;
  const { token } = req.cookies;
  if (token) {
    const userInfo = jwt.verify(token, process.env.JWT_KEY);
    try {
      const post = await PostMessage.findOne({
        _id: id,
        creator: userInfo._id,
      });
      res.status(200).json(post);
    } catch (error) {
      res.status(400).json(error.message);
    }
  } else {
    res.status(400).json({ message: "You are not authorized" });
  }
};
