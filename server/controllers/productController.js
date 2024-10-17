import Product from "../models/productModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import { successResponse } from "../utils/successResponse.js";

// create product
export const createProduct = async (req, res, next) => {
  try {
    const requiredFields = [
      "title",
      "description",
      "price",
      "category",
      "discountPercentage",
      "brand",
      "stock",
      "rating",
      "tags",
      "sku",
      "weight",
      "dimensions",
      "warrantyInformation",
      "shippingInformation",
      "availabilityStatus",
      "returnPolicy",
      "minimumOrderQuantity",
      "images",
      "thumbnail",
    ];

    // Validate input
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return next(new ErrorHandler(`${field} is required`, 400));
      }
    }

    const newProduct = await Product.create(req.body);

    res
      .status(201)
      .json(
        successResponse("Product created successfully", "product", newProduct)
      );
  } catch (err) {
    return next(new ErrorHandler(err.message, 500));
  }
};

// get single product
export const getSingleProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;

    // Find the product
    const product = await Product.findById(productId);

    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }

    res
      .status(200)
      .json(
        successResponse("Product fetched successfully", "product", product)
      );
  } catch (err) {
    return next(new ErrorHandler(err.message, 500));
  }
};

// get all products associated with a specific category
export const getAllProductsByCategory = async (req, res, next) => {
  try {
    const { categoryName } = req.params;
    let { sortBy, order } = req.query;
    sortBy = sortBy || "title";
    order = order || "asc";

    const sortingOption = {};
    sortingOption[sortBy] = order === "asc" ? 1 : -1;

    const products = await Product.find({ category: categoryName }).sort(
      sortingOption
    );

    return res
      .status(200)
      .json(
        successResponse("Products fetched successfuly", "products", products)
      );
  } catch (err) {
    return next(new ErrorHandler(err.message, 500));
  }
};

// update product
export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    // If product not found
    if (!updatedProduct) {
      return next(new ErrorHandler("Product not found", 404));
    }

    // Return success response with the updated product
    res
      .status(200)
      .json(
        successResponse(
          "Product updated successfully",
          "product",
          updatedProduct
        )
      );
  } catch (err) {
    return next(new ErrorHandler(err.message, 500));
  }
};

// delete product
export const deleteProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;

    // Check if the product exists
    const product = await Product.findByIdAndDelete(productId);
    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }

    res.status(200).json(successResponse("Product deleted successfully"));
  } catch (err) {
    return next(new ErrorHandler(err.message, 500));
  }
};

// Insert bulk products
export const insertBulkProducts = async (req, res, next) => {
  try {
    const { products } = req.body;

    if (!products || products.length === 0) {
      return next(new ErrorHandler("Products are not provided", 400));
    }

    // Insert many products in bulk
    const insertedProducts = await Product.insertMany(products);

    return res
      .status(201)
      .json(
        successResponse(
          "Bulk products inserted successfully",
          "products",
          insertedProducts
        )
      );
  } catch (err) {
    return next(new ErrorHandler(err.message, 500));
  }
};

// search products
export const searchProducts = async (req, res, next) => {
  try {
    const { q } = req.query;

    if (!q) {
      return next(new ErrorHandler("Please provide a search query", 500));
    }

    const products = await Product.find({
      $or: [
        { title: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
        { category: { $regex: q, $options: "i" } },
        { tags: { $regex: q, $options: "i" } },
        { brand: { $regex: q, $options: "i" } },
      ],
    });

    return res
      .status(200)
      .json(
        successResponse("Products fetched successfully", "products", products)
      );
  } catch (err) {
    return next(new ErrorHandler(err.message, 500));
  }
};
