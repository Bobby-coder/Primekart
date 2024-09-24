import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./features/category/categorySlice.js";
import sortingReducer from "./features/sorting/sortingSlice.js";
import cartReducer from "./features/cart/cartSlice.js";
import wishlistReducer from "./features/wishlist/wishlistSlice.js";
import searchReducer from "./features/search/SearchSlice.js";
import authReducer from "./features/auth/authSlice.js";
import productReducer from "./features/product/productSlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
    product: productReducer,
    sorting: sortingReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    search: searchReducer,
  },
});
