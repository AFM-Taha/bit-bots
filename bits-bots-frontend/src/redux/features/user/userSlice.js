import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  registerUser,
  loginUser,
  checkuser as checkuserApi,
} from "../../../api/index";

export const registerNewUser = createAsyncThunk(
  "user/registerNewUser",
  async (userData) => {
    const { data } = await registerUser(userData);
    return { email: data.email };
  }
);

export const signInUser = createAsyncThunk(
  "user/signInUser",
  async (userData) => {
    const { data } = await loginUser(userData);
    return { email: data.email };
  }
);

export const checkUser = createAsyncThunk("user/checkUser", async () => {
  const { data } = await checkuserApi();

  return { email: data?.user };
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoading: false,
    user: {},
    error: null,
  },

  reducers: {
    signOut: (state) => {
      state.user = {};
      state.isLoading = false;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerNewUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(signInUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(checkUser.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(registerNewUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    builder.addCase(signInUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    builder.addCase(checkUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    builder.addCase(registerNewUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.error = null;
    });
    builder.addCase(signInUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.error = null;
    });
    builder.addCase(checkUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.error = null;
    });
  },
});

export const { signOut } = userSlice.actions;

export default userSlice.reducer;
