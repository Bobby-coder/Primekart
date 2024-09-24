import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import { successResponse } from "../utils/successResponse.js";

//
export function getOriginalPrice(discountPercentage, priceAfterDiscount) {
  // Convert the discount percentage to a decimal
  const discountDecimal = discountPercentage / 100;

  // Calculate the original price
  const originalPrice = priceAfterDiscount / (1 - discountDecimal);

  return Math.round(originalPrice);
}

// Utility function to calculate total amount, total original amount and total items
export const calculateTotals = (items) => {
  const totals = items.reduce(
    (acc, item) => {
      // Total price of all items (total discounted amount)
      acc.totalAmount += item.product.price * item.quantity;

      // Count of all items
      acc.totalItems += 1;

      // Original price of current item
      let originalPrice = getOriginalPrice(
        item.product.discountPercentage,
        item.product.price
      );
      // Total original price of all items
      acc.totalOriginalPrice += originalPrice * item.quantity;

      return acc;
    },
    {
      totalAmount: 0,
      totalItems: 0,
      totalOriginalPrice: 0,
    }
  );

  return totals;
};

// add product to cart
export const addToCart = async (req, res, next) => {
  try {
    const userId = req.user;
    const { productId, quantity } = req.body;

    // Validate inputs
    if (!productId || !quantity || quantity <= 0) {
      return next(new ErrorHandler("Missing or invalid fields", 404));
    }

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }

    // Find cart
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // Initialize new cart
      cart = new Cart({
        userId,
        products: [{ product: productId, quantity }],
        savedForLater: [],
      });

      // Save the new cart first
      await cart.save();
    } else {
      // Check if product already present in cart
      const itemIndex = cart.products.findIndex(
        (item) => item.product.toString() === productId
      );
      if (itemIndex >= 0) {
        // Update quantity if product already in cart
        cart.products[itemIndex].quantity += quantity;
      } else {
        // Add new item to cart
        cart.products.unshift({ product: productId, quantity });
      }
    }

    // Populate products in cart before calculating totals
    cart = await cart.populate([
      {
        path: "products.product",
        select: "_id title thumbnail price discountPercentage category",
      },
      {
        path: "savedForLater",
        select: "_id title thumbnail price discountPercentage category",
      },
    ]);

    // Recalculate totals using populated products
    const { totalAmount, totalItems, totalOriginalPrice } = calculateTotals(
      cart.products
    );

    cart.totalAmount = totalAmount;
    cart.totalItems = totalItems;
    cart.totalOriginalPrice = totalOriginalPrice;

    // Save the updated cart
    await cart.save();

    res
      .status(200)
      .json(successResponse("Product added to cart", "cart", cart));
  } catch (err) {
    return next(new ErrorHandler(err.message, 500));
  }
};

// remove product from cart
export const removeFromCart = async (req, res, next) => {
  try {
    const userId = req.user;
    const productId = req.params.id;

    // Validate input
    if (!productId) {
      return next(new ErrorHandler("Product id is not provided", 404));
    }

    const cart = await Cart.findOne({ userId }).populate([
      {
        path: "products.product",
        select: "_id title thumbnail price discountPercentage category",
      },
      {
        path: "savedForLater",
        select: "_id title thumbnail price discountPercentage category",
      },
    ]);

    // Find the index of the product in the cart
    const itemIndex = cart.products.findIndex(
      (item) => item.product._id.toString() === productId
    );

    // If the product is not in the cart, return an error
    if (itemIndex === -1) {
      return next(new ErrorHandler("Product not found in cart", 404));
    }

    // Remove the product from the cart
    cart.products.splice(itemIndex, 1);

    // recalculate totals whenever items list is updated
    const { totalAmount, totalItems, totalOriginalPrice } = calculateTotals(
      cart.products
    );

    cart.totalAmount = totalAmount;
    cart.totalItems = totalItems;
    cart.totalOriginalPrice = totalOriginalPrice;

    // Save the updated cart
    await cart.save();

    res
      .status(200)
      .json(successResponse("Product removed from cart", "cart", cart));
  } catch (err) {
    return next(new ErrorHandler(err.message, 500));
  }
};

export const decreaseQuantity = async (req, res, next) => {
  try {
    const userId = req.user;
    const productId = req.params.id;

    // Validate input
    if (!productId) {
      return next(new ErrorHandler("Product ID is required", 404));
    }

    // Find the cart
    const cart = await Cart.findOne({ userId }).populate([
      {
        path: "products.product",
        select: "_id title thumbnail price discountPercentage category",
      },
      {
        path: "savedForLater",
        select: "_id title thumbnail price discountPercentage category",
      },
    ]);

    // Find the product in the cart
    const itemIndex = cart.products.findIndex(
      (item) => item.product._id.toString() === productId
    );

    if (itemIndex === -1) {
      return next(new ErrorHandler("Product not found in cart", 404));
    }

    // Decrease the quantity of the product
    if (cart.products[itemIndex].quantity > 1) {
      cart.products[itemIndex].quantity -= 1;
    } else {
      // Remove the product from the cart if quantity becomes 0
      cart.products.splice(itemIndex, 1);
    }

    // recalculate totals whenever items list is updated
    const { totalAmount, totalItems, totalOriginalPrice } = calculateTotals(
      cart.products
    );

    cart.totalAmount = totalAmount;
    cart.totalItems = totalItems;
    cart.totalOriginalPrice = totalOriginalPrice;

    // Save the updated cart
    await cart.save();

    res
      .status(200)
      .json(successResponse("Product quantity decreased", "cart", cart));
  } catch (err) {
    return next(new ErrorHandler(err.message, 500));
  }
};

// Clear cart
export const clearCart = async (req, res, next) => {
  try {
    const userId = req.user;

    // find cart
    const cart = await Cart.findOne({ userId });

    // If cart is empty
    if (!cart.length) {
      return next(new ErrorHandler("Cart is already empty", 500));
    }

    // Clear the cart by removing all items
    cart.products = [];

    // recalculate totals whenever items list is updated
    const { totalAmount, totalItems, totalOriginalPrice } = calculateTotals(
      cart.products
    );

    cart.totalAmount = 0;
    cart.totalItems = 0;
    cart.totalOriginalPrice = 0;

    await cart.save(); // Save the updated cart

    res
      .status(200)
      .json(successResponse("Cart cleared successfully", "cart", cart));
  } catch (err) {
    return next(new ErrorHandler(err.message, 500));
  }
};

// Get user's cart
export const getCart = async (req, res, next) => {
  try {
    const userId = req.user;

    // find cart
    let cart = await Cart.findOne({ userId }).populate([
      {
        path: "products.product",
        select: "_id title thumbnail price discountPercentage category",
      },
      {
        path: "savedForLater",
        select: "_id title thumbnail price discountPercentage",
      },
    ]);

    if (!cart) {
      cart = new Cart({ userId, products: [], savedForLater: [] });
      await cart.save();
    }

    res
      .status(200)
      .json(successResponse("Cart fetched successfully", "cart", cart));
  } catch (err) {
    return next(new Error(err.message));
  }
};

// saveForLater: Move items from the user's cart to a "Save for Later" list
export const saveForLater = async (req, res, next) => {
  try {
    const userId = req.user;
    const { productId } = req.body;

    // find cart
    let cart = await Cart.findOne({ userId });

    // Find the item in the cart
    const itemIndex = cart.products.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex !== -1) {
      // Remove the item from the cart
      const savedItem = cart.products.splice(itemIndex, 1)[0];
      // Move the item to the "Save for Later" list
      cart.savedForLater.unshift(savedItem.product);

      await cart.populate([
        {
          path: "products.product",
          select: "_id title thumbnail price discountPercentage category",
        },
        {
          path: "savedForLater",
          select: "_id title thumbnail price discountPercentage category",
        },
      ]);

      // recalculate totals whenever items list is updated
      const { totalAmount, totalItems, totalOriginalPrice } = calculateTotals(
        cart.products
      );

      cart.totalAmount = totalAmount;
      cart.totalItems = totalItems;
      cart.totalOriginalPrice = totalOriginalPrice;

      await cart.save();
    } else {
      return next(new ErrorHandler("Product not found in cart", 500));
    }

    res.status(200).json(successResponse("Item saved for later", "cart", cart));
  } catch (err) {
    return next(new ErrorHandler(err.message, 500));
  }
};

// moveToCart: Move items from the "Save for Later" list back to the user's cart
export const moveToCart = async (req, res, next) => {
  try {
    const userId = req.user;
    const { productId } = req.body;

    // find cart
    const cart = await Cart.findOne({ userId });

    // Find the item index in savedForLater
    const itemIndex = cart.savedForLater.findIndex(
      (item) => item.toString() === productId
    );

    if (itemIndex !== -1) {
      // Remove the item from the saved for later
      const movedItem = cart.savedForLater.splice(itemIndex, 1)[0];
      // Add the item to the cart
      cart.products.unshift({ product: movedItem, quantity: 1 });

      await cart.populate([
        {
          path: "products.product",
          select: "_id title thumbnail price discountPercentage category",
        },
        {
          path: "savedForLater",
          select: "_id title thumbnail price discountPercentage category",
        },
      ]);

      // recalculate totals whenever items list is updated
      const { totalAmount, totalItems, totalOriginalPrice } = calculateTotals(
        cart.products
      );

      cart.totalAmount = totalAmount;
      cart.totalItems = totalItems;
      cart.totalOriginalPrice = totalOriginalPrice;

      await cart.save();
    } else {
      return next(new ErrorHandler("Product not found in saved items", 500));
    }

    res.status(200).json(successResponse("Item moved to cart", "cart", cart));
  } catch (err) {
    return next(new ErrorHandler(err.message, 500));
  }
};

// removeSavedItem: Remove an item from the "Save for Later" list
export const removeSavedItem = async (req, res, next) => {
  try {
    const userId = req.user;
    const productId = req.params.id;

    // find cart
    let cart = await Cart.findOne({ userId }).populate([
      {
        path: "products.product",
        select: "_id title thumbnail price discountPercentage category",
      },
      {
        path: "savedForLater",
        select: "_id title thumbnail price discountPercentage category",
      },
    ]);

    // Find the item index in savedForLater
    const itemIndex = cart.savedForLater.findIndex(
      (item) => item._id.toString() === productId
    );
    if (itemIndex !== -1) {
      // Remove the item from savedForLater
      cart.savedForLater.splice(itemIndex, 1);
      await cart.save();
    } else {
      return next(new ErrorHandler("Product not found in saved items", 500));
    }

    res
      .status(200)
      .json(successResponse("Item removed from saved for later", "cart", cart));
  } catch (err) {
    return next(new ErrorHandler(err.message, 500));
  }
};

// emptySavedItems: Clear all items from the "Save for Later" list
export const emptySavedItems = async (req, res, next) => {
  try {
    const userId = req.user;

    // find cart
    const cart = await Cart.findOne({ userId });

    // Clear savedForLater array
    cart.savedForLater = [];
    await cart.save();

    res
      .status(200)
      .json(
        successResponse("All items removed from saved for later", "cart", cart)
      );
  } catch (err) {
    return next(new ErrorHandler(err.message, 500));
  }
};
