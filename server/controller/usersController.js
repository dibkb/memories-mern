import { UsersModel } from "../models/usersModel.js";
import jwt from "jsonwebtoken";
export const createJWT = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_KEY, { expiresIn: "3d" });
};
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UsersModel.login(email, password);
    const token = createJWT(user._id);
    res.cookie("token", token).json({
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
