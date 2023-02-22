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
const initialState = {
  userProfile: {},
  userPosts: [],
  admin: null,
  totalPages: null,
  // idle | loading | successfull | failed
  status: "idle",
  error: null,
};
const userPostSlice = createSlice({
  name: "userPosts",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUserProfile.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
      state.status = "successfull";
      state.userProfile = action.userProfile;
      state.userPosts = action.userPosts;
      state.admin = action.admin;
    });
    builder.addCase(fetchUserProfile.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export const getUserProfile = (state) => state.user.userProfile;
export const getUserPosts = (state) => state.user.userPosts;
export const getUserStatus = (state) => state.user.status;
export const getUserAdmin = (state) => state.user.admin;
export default userPostSlice.reducer;
