import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  items: [],
  status: "idle", // 'idle' | 'loading' | 'successfull' | 'failed'
  error: null,
};

// fetch cart
export const fetchCart = createAsyncThunk(
  "cart/fetch",
  async function (_, { rejectWithValue }) {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/cart`, {
        withCredentials: true,
      });
      return res.data?.cart;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch cart"
      );
    }
  }
);

// add to cart
export const addToCart = createAsyncThunk(
  "cart/add",
  async function ({ productId, quantity }, { rejectWithValue }) {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/cart`,
        { productId, quantity },
        { withCredentials: true }
      );
      return res.data?.cart; // Return the updated cart
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add to cart"
      );
    }
  }
);

// remove from cart
export const removeFromCart = createAsyncThunk(
  "cart/remove",
  async function (productId, { rejectWithValue }) {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/cart/${productId}`,
        { withCredentials: true }
      );
      return res.data?.cart; // Return the updated cart
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to remove from cart"
      );
    }
  }
);

// decrease item quantity
export const decreaseQuantity = createAsyncThunk(
  "cart/decreaseQuantity",
  async function (productId, { rejectWithValue }) {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/cart/decrease-quantity/${productId}`,
        {},
        { withCredentials: true }
      );
      return res.data?.cart; // Return the updated cart
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to decrease item quantity"
      );
    }
  }
);

// save for later
export const saveForLater = createAsyncThunk(
  "cart/saveForLater",
  async function (productId, { rejectWithValue }) {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/cart/save-for-later`,
        { productId },
        { withCredentials: true }
      );
      return res.data?.cart; // Return the updated cart
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to save item for later"
      );
    }
  }
);

// remove saved item
export const removeSavedItem = createAsyncThunk(
  "cart/removeSavedItem",
  async function (productId, { rejectWithValue }) {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/cart/saved-items/${productId}`,
        { withCredentials: true }
      );
      return res.data?.cart; // Return the updated cart
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to remove saved item"
      );
    }
  }
);

// move to cart
export const moveToCart = createAsyncThunk(
  "cart/moveToCart",
  async function (productId, { rejectWithValue }) {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/cart/move-to-cart`,
        { productId },
        { withCredentials: true }
      );
      return res.data?.cart; // Return the updated cart
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to move item to cart"
      );
    }
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    resetCart: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch cart
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = "successfull";
        state.items = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Add to cart
      .addCase(addToCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.status = "successfull";
        state.items = action.payload;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Remove from cart
      .addCase(removeFromCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.status = "successfull";
        state.items = action.payload;
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Save for later
      .addCase(saveForLater.pending, (state) => {
        state.status = "loading";
      })
      .addCase(saveForLater.fulfilled, (state, action) => {
        state.status = "successfull";
        state.items = action.payload;
      })
      .addCase(saveForLater.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Decrease quantity
      .addCase(decreaseQuantity.pending, (state) => {
        state.status = "loading";
      })
      .addCase(decreaseQuantity.fulfilled, (state, action) => {
        state.status = "successfull";
        state.items = action.payload;
      })
      .addCase(decreaseQuantity.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Remove saved item
      .addCase(removeSavedItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeSavedItem.fulfilled, (state, action) => {
        state.status = "successfull";
        state.items = action.payload;
      })
      .addCase(removeSavedItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Move to cart
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

export const { resetCart } = cartSlice.actions;
export default cartSlice.reducer;
