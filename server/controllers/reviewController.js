import Product from "../models/productModel.js";
import { successResponse } from "../utils/successResponse.js";
import ErrorHandler from "../utils/errorHandler.js";

// Create Review
export const createReview = async (req, res, next) => {
  try {
    const userId = req.user;
    const { rating, comment, reviewerName, reviewerEmail, productId } =
      req.body;

    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }

    // Create new review
    const newReview = {
      rating,
      comment,
      reviewerName,
      reviewerEmail,
      date: new Date(),
    };

    // Add the review to the product's reviews array
    product.reviews.unshift(newReview);
    await product.save();

    /* // Populate reviews to return the updated product
    await product.populate({
      path: "reviews",
      select: "rating comment reviewerName reviewerEmail date helpfulCount",
    }); */

    res
      .status(201)
      .json(successResponse("Review created successfully", "product", product));
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

export const updateReview = async (req, res, next) => {
  try {
    const { reviewId } = req.params;
    const { rating, comment } = req.body;

    // Find the product and update the specific review
    const product = await Product.findOneAndUpdate(
      { "reviews._id": reviewId },
      {
        $set: {
          "reviews.$.rating": rating,
          "reviews.$.comment": comment,
        },
      },
      { new: true } // Return the updated product after modification
    );

    if (!product) {
      return next(new ErrorHandler("Review or Product not found", 404));
    }

    res.status(200).json(
      successResponse(
        "Review updated successfully",
        "product",
        product // Return the entire updated product
      )
    );
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

// Get single review by review ID
export const getReviewById = async (req, res, next) => {
  try {
    const reviewId = req.params.reviewId;

    const review = await Review.findById(reviewId);

    if (!review) {
      return next(new ErrorHandler("Review not found", 404));
    }

    res
      .status(200)
      .json(successResponse("Review fetched successfuly", "review", review));
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

// Get all reviews for an product
export const getAllReviews = async (req, res, next) => {
  try {
    const productId = req.params.id;

    // Find the product by ID and populate the 'reviews' field
    const product = await Product.findById(productId).populate({
      path: "reviews",
      populate: {
        path: "user",
        model: "User",
      },
    });

    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }

    // Extract the populated reviews from the product
    const reviews = product.reviews;

    res
      .status(200)
      .json(
        successResponse("Reviews fetched successfully", "reviews", reviews)
      );
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

// Delete Review
export const deleteReview = async (req, res, next) => {
  try {
    const { reviewId } = req.params;

    // Find the product containing the review and remove the review
    const product = await Product.findOneAndUpdate(
      { "reviews._id": reviewId },
      { $pull: { reviews: { _id: reviewId } } },
      { new: true } // Returns the updated product
    );

    if (!product) {
      return next(new ErrorHandler("Review or Product not found", 404));
    }

    res
      .status(200)
      .json(successResponse("Review deleted successfully", "product", product));
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};
