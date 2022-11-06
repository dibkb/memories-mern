import { UsersModel } from "../models/usersModel.js";
export const loginUser = async (req, res) => {
  res.json({ mssg: "login user" });
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
