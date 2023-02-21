import mongoose from "mongoose";
const dataSchema = new mongoose.Schema({
  title: {
    required: true,
    type: String,
  },
  message: {
    required: true,
    type: String,
  },
  selectedFile: {
    required: true,
    type: String,
  },
  likeCount: {
    type: Number,
    default: 0,
  },
  creatorName: {
    type: String,
    required: true,
  },
  creatorImage: {
    type: String,
    required: true,
  },
  creator: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "UsersModel",
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});
dataSchema.statics.createPost = async function (
  title,
  message,
  selectedFile,
  creator
) {
  const post = await this.create({
    title,
    message,
    selectedFile,
    creator,
  });
  return post;
};
export const PostMessage = mongoose.model("PostMessage", dataSchema);
