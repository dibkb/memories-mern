import mongoose from "mongoose";
import bcrypt from "bcrypt";
const userDataSchema = new mongoose.Schema({
  email: {
    required: true,
    unique: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  firstName: {
    required: true,
    type: String,
  },
  lastName: {
    required: true,
    type: String,
  },
  image: {
    required: false,
    type: String,
  },
});
userDataSchema.statics.signup = async function (
  email,
  password,
  firstName,
  lastName,
  image
) {
  const exist = await this.findOne({ email: email });
  if (exist) {
    throw Error("Email already in use");
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({
    email,
    password: hash,
    firstName,
    lastName,
    image,
  });
  return user;
};
export const UsersModel = mongoose.model("UsersModel", userDataSchema);
