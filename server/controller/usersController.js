import { UsersModel } from "../models/usersModel.js";
import { PostMessage } from "../models/postMessage.js";
import jwt from "jsonwebtoken";
export const createJWT = (_id) => {
  return jwt.sign({ _id }, "L41o!jneldV9yD<399/>", { expiresIn: "3d" });
};
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UsersModel.login(email, password);
    const token = createJWT(user._id);
    res
      .cookie("token", token, {
        domain: "https://memoriies.netlify.app",
      })
      .json({
        user,
      });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
export const signupUser = async (req, res) => {
  const { email, password, firstName, lastName, image } = req.body;
  try {
    const user = await UsersModel.signup(
      email,
      password,
      firstName,
      lastName,
      image
    );
    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const validateEmail = async (req, res) => {
  const { email } = req.body;
  try {
    const emailExists = await UsersModel.validateEmail(email);
    res.status(200).json({ emailExists });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
export const getProfile = async (req, res) => {
  const { token } = req.cookies;
  try {
    const userInfo = jwt.verify(token, process.env.JWT_KEY);
    const user = await UsersModel.getById(userInfo._id);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
export const getProfileById = async (req, res) => {
  const { id } = req.params;
  const { token } = req.cookies;
  // let userPosts;
  let userProfile;
  // ------------------ check if id is valid----------------------
  try {
    // userPosts = await PostMessage.find({ creator: id });
    userProfile = await UsersModel.findOne({ _id: id }).select("-password");
  } catch (error) {
    res.status(404).json(error.message);
  }
  // ---------------------Check authentication--------------
  if (token) {
    try {
      const userInfo = jwt.verify(token, process.env.JWT_KEY);
      if (userInfo._id === id) {
        res.status(200).json({
          userProfile: userProfile,
          admin: true,
        });
      } else {
        res.status(200).json({
          userProfile: userProfile,
          admin: false,
        });
      }
    } catch (error) {
      res.status(400).json(error.message);
    }
  } else {
    res.status(200).json({
      userProfile: userProfile,
      admin: false,
    });
  }
};
export const getProfilePosts = async (req, res) => {
  const { token } = req.cookies;
  const { id } = req.params;
  const page = parseInt(req.query.page || 0);
  const PAGE_SIZE = 3;
  let postMessages;
  let total;
  if (token) {
    try {
      const userInfo = jwt.verify(token, process.env.JWT_KEY);
      postMessages = await PostMessage.find({ creator: id })
        .sort({ _id: -1 })
        .limit(PAGE_SIZE)
        .skip(PAGE_SIZE * page);
      total = await PostMessage.find({ creator: id }).countDocuments({});
      res.status(200).json({
        totalPages: Math.ceil(total / PAGE_SIZE),
        posts: postMessages,
        admin: userInfo._id === id,
      });
    } catch (error) {
      res.status(404).json(error.message);
    }
  } else {
    try {
      postMessages = await PostMessage.find({ creator: id })
        .sort({ _id: -1 })
        .limit(PAGE_SIZE)
        .skip(PAGE_SIZE * page);
      total = await PostMessage.find({ creator: id }).countDocuments({});
      res.status(200).json({
        totalPages: Math.ceil(total / PAGE_SIZE),
        posts: postMessages,
        admin: false,
      });
    } catch (error) {
      res.status(404).json(error.message);
    }
  }
};
export const deleteUserPost = async (req, res) => {
  const { token } = req.cookies;
  const { id } = req.params;
  if (token) {
    try {
      const userInfo = jwt.verify(token, process.env.JWT_KEY);
      PostMessage.findOneAndDelete({
        _id: id,
        creator: userInfo._id,
      }).then((response) => {
        res.status(200).json({ message: "post sucessfully deleted" });
      });
    } catch (error) {
      res.status(404).json({ message: "You are not authorized" });
    }
  } else {
    res.status(404).json({ message: "You are not authorized" });
  }
};
export const logoutUser = async (req, res) => {
  try {
    res.cookie("token", "").json();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
