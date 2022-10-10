import { createSlice } from "@reduxjs/toolkit";

import propertyGames from "../../../assets/propertyGames";

const platformGamesSlice = createSlice({
  name: "platformGames",
  initialState: {
    isLoading: true,
    platformGames: [],
    error: null,
  },
  reducers: {
    fetchPlatformProducts: (state, action) => {
      const platformID = parseFloat(action.payload.id);
      const products = action.payload.products;

      console.log(action.payload);

      const platformGames = propertyGames(
        products,
        platformID,
        "platforms",
        0,
        0
      );

      state.platformGames = platformGames;
    },
  },
});

export const { fetchPlatformProducts } = platformGamesSlice.actions;

export default platformGamesSlice.reducer;
