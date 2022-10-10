import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCartItems } from "../../../api";
import {
  removeFromLocalStorage,
  setToLocalStorage,
} from "../../../assets/localStorage";

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (products) => {
    const data = await getCartItems(products);
    return data;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    isLoading: true,
    cart: [],
    error: null,
  },

  reducers: {
    addCart: (state, action) => {
      const isExist = state.cart.find((c) => c.id === action.payload.id);

      if (!isExist) {
        state.cart = [...state.cart, action.payload];

        setToLocalStorage(action.payload.id);
      } else {
        const isExist = state.cart.filter((c) => c.id !== action.payload.id);
        state.cart = [...isExist];
        removeFromLocalStorage(action.payload.id);
      }
    },
    removeCart: (state, action) => {
      const isExist = state.cart.filter((c) => c.id !== action.payload.id);
      state.cart = [...isExist];
      removeFromLocalStorage(action.payload.id);
    },
    emptyCart: (state, action) => {
      state.cart = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCart.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCart.rejected, (state, action) => {
      state.isLoading = false;
      state.cart = [];
      state.error = action.error;
    });
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.isLoading = false;
      state.cart = action.payload;
      state.error = null;
    });
  },
});
export const { addCart, removeCart, emptyCart } = cartSlice.actions;

export default cartSlice.reducer;
