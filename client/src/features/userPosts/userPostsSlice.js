import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASEURL } from "../../api/api";
export const fetchUserProfile = createAsyncThunk(
  "posts/fetchUser",
  async (id) => {
    const POST_URL = `${BASEURL}/users/${id}`;
    const response = await axios.get(POST_URL, { withCredentials: true });
    return response.data;
  }
);
export const fetchUserPosts = createAsyncThunk(
  "posts/fetchUserPosts",
  async (data) => {
    const { id, currPage } = data;
    const POST_URL = `${BASEURL}/users/${id}/posts?page=${currPage}`;
    const response = await axios.get(POST_URL, { withCredentials: true });
    return response.data;
  }
);
const initialState = {
  userProfile: {},
  userPosts: [],
  admin: false,
  totalPages: null,
  // idle | loading | successfull | failed
  postStatus: "idle",
  profileStatus: "idle",
  error: null,
};
const userPostSlice = createSlice({
  name: "userPosts",
  initialState,
  reducers: {
    removeUserPost: (state, action) => {
      state.userPosts = state.userPosts.filter(
        (ele) => ele._id !== action.payload
      );
    },
  },
  extraReducers(builder) {
    // ------------fetchUserProfile-------------------------------
    builder.addCase(fetchUserProfile.pending, (state, action) => {
      state.profileStatus = "loading";
    });
    builder.addCase(fetchUserProfile.fulfilled, (state, { payload }) => {
      state.profileStatus = "successfull";
      state.userProfile = payload.userProfile;
      state.admin = payload.admin;
    });
    builder.addCase(fetchUserProfile.rejected, (state, action) => {
      state.profileStatus = "failed";
      state.error = action.error.message;
    });
    // ------------fetchUserPosts-------------------------------
    builder.addCase(fetchUserPosts.pending, (state, action) => {
      state.postStatus = "loading";
    });
    builder.addCase(fetchUserPosts.fulfilled, (state, { payload }) => {
      state.postStatus = "successfull";
      state.userPosts = payload.posts;
      state.totalPages = payload.totalPages;
      state.admin = payload.admin;
    });
    builder.addCase(fetchUserPosts.rejected, (state, action) => {
      state.postStatus = "failed";
      state.error = action.error.message;
    });
  },
});
export const { removeUserPost } = userPostSlice.actions;
export const getUserProfile = (state) => state.user.userProfile;
export const getUserPosts = (state) => state.user.userPosts;
export const getPostStatus = (state) => state.user.postStatus;
export const getTotalPages = (state) => state.user.totalPages;
export const getProfileStatus = (state) => state.user.profileStatus;
export const getUserAdmin = (state) => state.user.admin;
export default userPostSlice.reducer;
