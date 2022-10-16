import { createSlice } from "@reduxjs/toolkit";

const paginationSlice = createSlice({
  name: "pagination",
  initialState: {
    currentItems: [],
    pageCount: 0,
    itemOffset: 0,
    itemsPerPage: 20,
  },
  reducers: {
    handlePagination: (state, action) => {
      const selected = action.payload.event?.selected || 0;
      const endOffset = state.itemOffset + state.itemsPerPage;
      const newOffset =
        (selected * state.itemsPerPage) % action.payload.products?.length;

      state.currentItems = action.payload.products?.slice(
        state.itemOffset,
        endOffset
      );
      state.pageCount = Math.ceil(
        action.payload.products?.length / state.itemsPerPage
      );
      state.itemOffset = newOffset;
    },
    initiatePagination: (state, action) => {
      const endOffset = state.itemOffset + state.itemsPerPage;
      const newOffset =
        (0 * state.itemsPerPage) % action.payload.products?.length;

      state.currentItems = action.payload.products?.slice(
        state.itemOffset,
        endOffset
      );
      state.pageCount = Math.ceil(
        action.payload.products?.length / state.itemsPerPage
      );
      state.itemOffset = newOffset;
    },
  },
});

export const { handlePagination, initiatePagination } = paginationSlice.actions;

export default paginationSlice.reducer;
