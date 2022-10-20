import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserApi } from "../../../api";

export const fetchUser = createAsyncThunk("user/fetchUser", async (email) => {
  const { data } = await getUserApi(email);

  return data?.user;
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoading: true,
    user: null,
    error: null,
  },

  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      console.log(action.payload);
      state.error = null;
    });
  },
});

export default userSlice.reducer;
