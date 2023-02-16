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
userDataSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Incorrect email address");
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect password");
  }
  return user;
};
// -----------------Validations------------------
userDataSchema.statics.validateEmail = async function (email) {
  const exist = await this.findOne({ email: email });
  if (exist) {
    return true;
  } else {
    return false;
  }
};
userDataSchema.statics.getById = async function (_id) {
  const user = await this.findOne({ _id: _id });
  if (!user) {
    throw Error("Id is not valid");
  }
  return user;
};

export const UsersModel = mongoose.model("UsersModel", userDataSchema);
