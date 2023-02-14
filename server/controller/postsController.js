import { PostMessage } from "../models/postMessage.js";
export const getPosts = async (req, res) => {
  console.log("POSAT");
  try {
    const postMessages = await PostMessage.find();
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json(error.message);
  }
};
export const createPosts = async (req, res) => {
  const { title, message, selectedFile, creator } = req.body;
  const newPost = new PostMessage({
    title: title,
    message: message,
    selectedFile: selectedFile,
    creator: creator,
  });
  try {
    await newPost.save();
    res.status(200).send("new post created sucessfully");
  } catch (error) {
    res.status(404).json(error.message);
  }
};
