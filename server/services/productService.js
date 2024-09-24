/* import ErrorHandler from "../utils/errorHandler.js";
import { successResponse } from "../utils/successResponse.js";
//import Product from "../models/productModel.js";

// get all products
export const getAllProducts = async (req, res, next) => {
  try {
    // Find all products
    const products = await Product.find();

    if (!products.length) {
      return next(new ErrorHandler("No product found", 404));
    }

    res
      .status(200)
      .json(
        successResponse("Product fetched successfully", "products", products)
      );
  } catch (err) {
    return next(new ErrorHandler(err.message, 500));
  }
};
 */