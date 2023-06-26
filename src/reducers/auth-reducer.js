import { createSlice } from "@reduxjs/toolkit";
import {
  loginThunk,
  logoutThunk,
  profileThunk,
  registerThunk,
  updateUserThunk
} from "../services/auth-thunks";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    currentUser: JSON.parse(localStorage.getItem("currentUser")) || null
  },
  reducers: {},
  extraReducers: {
    [loginThunk.fulfilled]: (state, { payload }) => {
      state.currentUser = payload;
      localStorage.setItem("currentUser", JSON.stringify(payload)); // Store the currentUser in localStorage
    },
    [logoutThunk.fulfilled]: (state) => {
      state.currentUser = null;
      localStorage.removeItem("currentUser"); // Remove the currentUser from localStorage
    },
    [profileThunk.fulfilled]: (state, { payload }) => {
      state.currentUser = payload;
      localStorage.setItem("currentUser", JSON.stringify(payload)); // Store the currentUser in localStorage
    },
    [updateUserThunk.fulfilled]: (state, { payload }) => {
      state.currentUser = payload;
      localStorage.setItem("currentUser", JSON.stringify(payload)); // Store the currentUser in localStorage
    },
    [registerThunk.fulfilled]: (state, { payload }) => {
      state.currentUser = payload;
      localStorage.setItem("currentUser", JSON.stringify(payload)); // Store the currentUser in localStorage
    },
  }
});

export default authSlice.reducer;
