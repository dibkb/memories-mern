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
    res.status(200).json({ email, token });
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
    res.status(200).json({ email, user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
