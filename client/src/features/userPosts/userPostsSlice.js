import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchUserProfile = createAsyncThunk(
  "posts/fetchUser",
  async (id) => {
    const POST_URL = `http://localhost:4000/users/${id}`;
    const response = await axios.get(POST_URL, { withCredentials: true });
    return response.data;
  }
);
export const fetchUserPosts = createAsyncThunk(
  "posts/fetchUser",
  async (id) => {
    const POST_URL = `http://localhost:4000/users/posts${id}`;
    const response = await axios.get(POST_URL, { withCredentials: true });
    return response.data;
  }
);
const initialState = {
  userProfile: {},
  userPosts: [],
  admin: null,
  totalPages: null,
  // idle | loading | successfull | failed
  postStatus: "idle",
  profileStatus: "idle",
  error: null,
};
const userPostSlice = createSlice({
  name: "userPosts",
  initialState,
  reducers: {},
  extraReducers(builder) {
    // ------------fetchUserProfile-------------------------------
    builder.addCase(fetchUserProfile.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchUserProfile.fulfilled, (state, { payload }) => {
      state.status = "successfull";
      state.userProfile = payload.userProfile;
      state.admin = payload.admin;
    });
    builder.addCase(fetchUserProfile.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    // ------------fetchUserPosts-------------------------------
  },
});

export const getUserProfile = (state) => state.user.userProfile;
export const getUserPosts = (state) => state.user.userPosts;
export const getPostStatus = (state) => state.user.postStatus;
export const getProfileStatus = (state) => state.user.profileStatus;
export const getUserAdmin = (state) => state.user.admin;
export default userPostSlice.reducer;
