import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  items: [],
  status: "idle", // 'idle' | 'loading' | 'successfull' | 'failed'
  error: null,
};

// fetch wishlist
export const fetchWishlist = createAsyncThunk(
  "wishlist/fetch",
  async function (_, { rejectWithValue }) {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/wishlist`, {
        withCredentials: true,
      });
      return res.data?.wishlist;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch wishlist"
      );
    }
  }
);

// add to wishlist
export const addToWishlist = createAsyncThunk(
  "wishlist/add",
  async function (productId, { rejectWithValue }) {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/wishlist`,
        { productId },
        { withCredentials: true }
      );
      return res.data?.wishlist;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add to wishlist"
      );
    }
  }
);

// remove from wishlist
export const removeFromWishlist = createAsyncThunk(
  "wishlist/remove",
  async function (id, { rejectWithValue }) {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/wishlist/${id}`,
        { withCredentials: true }
      );
      return res.data?.wishlist;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to remove from wishlist"
      );
    }
  }
);

// move to cart
export const moveToCart = createAsyncThunk(
  "wishlist/moveToCart",
  async function (id, { rejectWithValue }) {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/wishlist/move-to-cart`,
        { productId: id },
        { withCredentials: true }
      );
      return res.data?.wishlist;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to move item to cart"
      );
    }
  }
);

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    resetWishList: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.status = "successfull";
        state.items = action.payload;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(addToWishlist.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.status = "successfull";
        state.items = action.payload;
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(removeFromWishlist.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.status = "successfull";
        state.items = action.payload;
      })
      .addCase(removeFromWishlist.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(moveToCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(moveToCart.fulfilled, (state, action) => {
        state.status = "successfull";
        state.items = action.payload;
      })
      .addCase(moveToCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { resetWishList } = wishlistSlice.actions;
export default wishlistSlice.reducer;
