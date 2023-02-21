import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (pageNo = 0) => {
    const POST_URL = `http://localhost:4000/posts?page=${pageNo}`;
    const response = await axios.get(POST_URL);
    return response.data;
  }
);
const initialState = {
  posts: [],
  totalPages: null,
  // idle | loading | successfull | failed
  status: "idle",
  error: null,
};
const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchPosts.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.status = "successfull";
      state.posts = action.payload.posts;
      state.totalPages = action.payload.totalPages;
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});
export const getAllPosts = (state) => state.posts.posts;
export const getPostStatus = (state) => state.posts.status;
export const getTotalPages = (state) => state.posts.totalPages;
export const getPostError = (state) => state.posts.error;
export default postSlice.reducer;
