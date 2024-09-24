import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define the thunk for fetching product data
export const fetchProduct = createAsyncThunk(
  "product/fetch",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/products/${productId}`
      );

      if (response.data === null) {
        return rejectWithValue("Invalid product Id");
      }

      return response.data?.product;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

export const addReview = createAsyncThunk(
  "products/add",
  async (
    { rating, comment, reviewerName, reviewerEmail, productId },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/reviews/`,
        { rating, comment, reviewerName, reviewerEmail, productId },
        { withCredentials: true }
      );

      return res.data?.product;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

export const updateReview = createAsyncThunk(
  "products/update",
  async ({ rating, comment, reviewId }, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/reviews/${reviewId}`,
        { rating, comment },
        { withCredentials: true }
      );

      return res.data?.product;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

export const deleteReview = createAsyncThunk(
  "products/delete",
  async (reviewId, { rejectWithValue }) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/reviews/${reviewId}`,
        { withCredentials: true }
      );

      return res.data?.product;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

// Define the productSlice
const productSlice = createSlice({
  name: "product",
  initialState: {
    productData: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.productData = action.payload;
        state.error = null;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.loading = false;
        state.productData = action.payload;
        state.error = null;
      })
      .addCase(addReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateReview.fulfilled, (state, action) => {
        state.loading = false;
        state.productData = action.payload;
        state.error = null;
      })
      .addCase(updateReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
