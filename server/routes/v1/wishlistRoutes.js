import express from "express";
import {
  addToWishlist,
  clearWishlist,
  getWishlist,
  moveToCart,
  removeFromWishlist,
} from "../../controllers/wishlistController.js";
import { isAuthenticated } from "../../middleware/authMiddleware.js";

const router = express.Router();

// Add Product to Wishlist
router.post("/", isAuthenticated, addToWishlist);

router.post("/move-to-cart", isAuthenticated, moveToCart);

// Get Wishlist
router.get("/", isAuthenticated, getWishlist);

// Remove Product from Wishlist
router.delete("/:id", isAuthenticated, removeFromWishlist);

// Clear Wishlist
router.delete("/clear", isAuthenticated, clearWishlist);

export default router;
