import ErrorHandler from "../utils/errorHandler.js";
import { successResponse } from "../utils/successResponse.js";
import Category from "../models/categoryModel.js";

// get all categories
export const getAllCategories = async (req, res, next) => {
  try {
    // Find all categories
    const categories = await Category.find();

    if (!categories.length) {
      return next(new ErrorHandler("No category found", 404));
    }

    return res
      .status(200)
      .json(
        successResponse(
          "All category fetched successfuly",
          "categories",
          categories
        )
      );
  } catch (err) {
    return next(new ErrorHandler(err.message, 500));
  }
};
