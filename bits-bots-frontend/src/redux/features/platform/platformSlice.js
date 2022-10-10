import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getAllPlatformsApi } from "../../../api/index";

export const fetchPlatforms = createAsyncThunk(
  "platforms/fetchPlatforms",
  async () => {
    const data = await getAllPlatformsApi();
    return data;
  }
);

const platformSlice = createSlice({
  name: "platforms",
  initialState: {
    isLoading: true,
    platforms: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPlatforms.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchPlatforms.rejected, (state, action) => {
      state.isLoading = false;
      state.platforms = [];
      state.error = action.error;
    });
    builder.addCase(fetchPlatforms.fulfilled, (state, action) => {
      state.isLoading = false;
      state.platforms = action.payload;
      state.error = null;
    });
  },
});

export default platformSlice.reducer;
