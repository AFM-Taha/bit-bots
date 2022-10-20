import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getGamesApi } from "../../../api";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const data = await getGamesApi();
    return data;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    isLoading: true,
    products: [],
    error: null,
  },

  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
      state.error = null;
    });
  },
});

export default productSlice.reducer;
