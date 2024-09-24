import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchText: "",
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    updateSearchText: (state, action) => {
      state.searchText = action.payload.trim();
    },
  },
});

export const { updateSearchText } = searchSlice.actions;

export default searchSlice.reducer;
