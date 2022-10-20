import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import paginationReducer from "../features/pagination/paginationSlice";
import platformReducer from "../features/platform/platformSlice";
import platformGamesReducer from "../features/platformProducts/platformProducts";
import productReducer from "../features/products/productSlice";
import userReducer from "../features/user/userSlice";

const store = configureStore({
  reducer: {
    products: productReducer,
    user: userReducer,
    cart: cartReducer,
    pagination: paginationReducer,
    platforms: platformReducer,
    platformGames: platformGamesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
