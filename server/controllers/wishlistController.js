import Wishlist from "../models/wishlistModel.js";
import { successResponse } from "../utils/successResponse.js";
import ErrorHandler from "../utils/errorHandler.js";
import Cart from "../models/cartModel.js";
import { calculateTotals } from "./cartController.js";

// Add Product to Wishlist
export const addToWishlist = async (req, res, next) => {
  try {
    const userId = req.user;
    const { productId } = req.body;

    if (!productId) {
      return next(new ErrorHandler("No product provided", 404));
    }

    // Find wishlist for the user, create one if not exists
    let wishlist = await Wishlist.findOne({ userId });
    if (!wishlist) {
      wishlist = new Wishlist({ userId, products: [productId] });
    } else {
      if (wishlist.products.includes(productId)) {
        return next(new ErrorHandler("Product already in wishlist", 400));
      }
      wishlist.products.unshift(productId);
    }

    await wishlist.save();

    await wishlist.populate({
      path: "products",
      select: "_id title thumbnail price discountPercentage category",
    });

    res
      .status(200)
      .json(
        successResponse(
          "Product added to wishlist successfully",
          "wishlist",
          wishlist
        )
      );
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

// Get Wishlist
export const getWishlist = async (req, res, next) => {
  try {
    const userId = req.user;

    // Find wishlist and populate the products
    let wishlist = await Wishlist.findOne({ userId }).populate({
      path: "products",
      select: "_id title thumbnail price discountPercentage category",
    });

    if (!wishlist) {
      wishlist = new Wishlist({ userId, products: [] });
      await wishlist.save();
    }

    res
      .status(200)
      .json(
        successResponse("Wishlist fetched successfully", "wishlist", wishlist)
      );
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

// Remove Product from Wishlist
export const removeFromWishlist = async (req, res, next) => {
  try {
    const userId = req.user;
    const productId = req.params.id;

    if (!productId) {
      return next(new ErrorHandler("No product provided", 404));
    }

    // Find the user's wishlist
    const wishlist = await Wishlist.findOne({ userId });
    if (!wishlist) {
      return next(new ErrorHandler("Wishlist not found", 404));
    }

    const isExisting = wishlist.products.find(
      (id) => id?.toString() === productId
    );
    if (!isExisting) {
      return next(
        new ErrorHandler("This product is not present in your wishlist", 404)
      );
    }

    // Remove the product from the wishlist
    wishlist.products = wishlist.products.filter(
      (id) => id?.toString() !== productId
    );
    await wishlist.save();

    await wishlist.populate({
      path: "products",
      select: "_id title thumbnail price discountPercentage category",
    });

    res
      .status(200)
      .json(
        successResponse(
          "Product removed from wishlist successfully",
          "wishlist",
          wishlist
        )
      );
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

// Clear Wishlist
export const clearWishlist = async (req, res, next) => {
  try {
    const userId = req.user;

    // Find the user's wishlist
    const wishlist = await Wishlist.findOne({ userId });
    if (!wishlist.length) {
      return next(new ErrorHandler("Wishlist is already empty", 404));
    }

    // Clear the wishlist
    wishlist.products = [];
    await wishlist.save();

    res
      .status(200)
      .json(
        successResponse("Wishlist cleared successfully", "wishlist", wishlist)
      );
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

// moveToCart: Move items from the wishlist to the user's cart
export const moveToCart = async (req, res, next) => {
  try {
    const userId = req.user;
    const { productId } = req.body;

    // find wishlist
    const wishlist = await Wishlist.findOne({ userId });

    // Find the item index in savedForLater
    const itemIndex = wishlist.products.findIndex(
      (item) => item.toString() === productId
    );

    if (itemIndex !== -1) {
      // Remove the item from the saved for later
      const movedItem = wishlist.products.splice(itemIndex, 1)[0];

      // find cart
      const cart = await Cart.findOne({ userId });

      // Add the item to the cart
      cart.products.unshift({ product: movedItem, quantity: 1 });

      await cart.populate({
        path: "products.product",
        select: "price discountPercentage",
      });

      // recalculate totals whenever items list is updated
      const { totalAmount, totalItems, totalOriginalPrice } = calculateTotals(
        cart.products
      );

      cart.totalAmount = totalAmount;
      cart.totalItems = totalItems;
      cart.totalOriginalPrice = totalOriginalPrice;

      await cart.save();
      await wishlist.save();
    } else {
      return next(new ErrorHandler("Product not found in wishlist", 500));
    }

    await wishlist.populate({
      path: "products",
      select: "_id title thumbnail price discountPercentage category",
    });

    res
      .status(200)
      .json(successResponse("Item moved to cart", "wishlist", wishlist));
  } catch (err) {
    return next(new ErrorHandler(err.message, 500));
  }
};
