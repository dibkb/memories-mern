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
  creator: {
    required: true,
    type: String,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});
export const PostMessage = mongoose.model("PostMessage", dataSchema);
