import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../features/posts/postSlice";
import userReducer from "../features/userPosts/userPostsSlice";
export const store = configureStore({
  reducer: {
    posts: postReducer,
    user: userReducer,
  },
});
