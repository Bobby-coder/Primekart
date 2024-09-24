import express from "express";
import {
  addToCart,
  clearCart,
  decreaseQuantity,
  emptySavedItems,
  getCart,
  moveToCart,
  removeFromCart,
  removeSavedItem,
  saveForLater,
} from "../../controllers/cartController.js";
import { isAuthenticated } from "../../middleware/authMiddleware.js";

const router = express.Router();

// Add Product to Cart
router.post("/", isAuthenticated, addToCart);

// Remove Product from Cart
router.delete("/:id", isAuthenticated, removeFromCart);

// Add Product to Cart
router.put("/decrease-quantity/:id", isAuthenticated, decreaseQuantity);

// Clear Cart
router.delete("/clear", isAuthenticated, clearCart);

// Get User's Cart
router.get("/", isAuthenticated, getCart);

// Save Item for Later
router.post("/save-for-later", isAuthenticated, saveForLater);

// Move Item to Cart from "Save for Later"
router.post("/move-to-cart", isAuthenticated, moveToCart);

// Remove Saved Item
router.delete("/saved-items/:id", isAuthenticated, removeSavedItem);

// Empty Saved Items
router.delete("/saved-items/clear", isAuthenticated, emptySavedItems);

export default router;
