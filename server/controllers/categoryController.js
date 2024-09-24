import { successResponse } from "../utils/successResponse.js";
import Category from "../models/categoryModel.js";
import ErrorHandler from "../utils/errorHandler.js";

// create new category
export const createCategory = async (req, res, next) => {
  try {
    const { name, slug, thumbnail } = req.body;

    // Check if category with specified name or slug already exists
    const existingCategory = await Category.findOne({
      $or: [{ name }, { slug }],
    });

    if (existingCategory) {
      return next(
        new ErrorHandler(
          existingCategory.name === name
            ? "A category with this name already exists"
            : "A category with this slug already exists",
          400
        )
      );
    }

    // Create new category
    const newCategory = new Category({
      name,
      slug,
      thumbnail,
    });

    // Save the category to the database
    await newCategory.save();

    return res
      .status(201)
      .json(
        successResponse(
          "Category created successfully",
          "category",
          newCategory
        )
      );
  } catch (err) {
    return next(new ErrorHandler(err.message, 500));
  }
};

// get all categories
export const getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();

    return res
      .status(200)
      .json(
        successResponse(
          "Categories fetched successfully",
          "categories",
          categories
        )
      );
  } catch (err) {
    return next(new ErrorHandler(err.message, 500));
  }
};

// update category
export const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    const category = await Category.findByIdAndUpdate(id, req.body, {
      new: true, // Return updated document
      runValidators: true, // To apply schema validations
    });
    if (!category) {
      return next(new ErrorHandler("Category not found!", 404));
    }

    return res
      .status(200)
      .json(
        successResponse("Category updated successfully", "category", category)
      );
  } catch (err) {
    return next(new ErrorHandler(err.message, 500));
  }
};

// delete a category
export const deleteCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.id;

    // Find the category by name
    const category = await Category.findByIdAndDelete(categoryId);
    if (!category) {
      return next(new ErrorHandler("Category not found", 404));
    }

    return res
      .status(200)
      .json(successResponse("Category deleted successfuly"));
  } catch (err) {
    return next(new ErrorHandler(err.message, 500));
  }
};

// Insert multiple categories
export const insertMultipleCategories = async (req, res, next) => {
  try {
    const { categories } = req.body;

    // Check if array is empty
    if (!categories || !categories.length) {
      return next(new ErrorHandler("No categories provided to insert", 400));
    }

    // Validate if any category with duplicate name or slug already exists
    const existingSlugs = await Category.find({
      slug: { $in: categories.map((category) => category.slug) },
    });

    const existingNames = await Category.find({
      name: { $in: categories.map((category) => category.name) },
    });

    if (existingSlugs.length || existingNames.length) {
      const duplicateSlugs = existingSlugs.map((cat) => cat.slug);
      const duplicateNames = existingNames.map((cat) => cat.name);

      return next(
        new ErrorHandler(
          `Duplicate categories found! Slugs: ${duplicateSlugs.join(
            ", "
          )}, Names: ${duplicateNames.join(", ")}`,
          400
        )
      );
    }

    // Insert multiple categories at once
    const insertedCategories = await Category.insertMany(categories);

    return res
      .status(201)
      .json(
        successResponse(
          "Categories inserted successfully",
          "categories",
          insertedCategories
        )
      );
  } catch (err) {
    return next(new ErrorHandler(err.message, 500));
  }
};

// Note- As of now any changes made to any category are not synced with associated products.
