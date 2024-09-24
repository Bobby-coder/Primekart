import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  items: [],
  status: "idle", // 'idle' | 'loading' | 'successfull' | 'failed'
  error: null,
};

export const fetchCategories = createAsyncThunk(
  "category/names",
  async function () {
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/categories`);
    return res.data;
  }
);

export const categorySlice = createSlice({
  name: "categories",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "successfull";
        state.items = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default categorySlice.reducer;
