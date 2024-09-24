import express from "express";
import {
  createReview,
  deleteReview,
  getAllReviews,
  getReviewById,
  updateReview,
} from "../../controllers/reviewController.js";
import { isAuthenticated } from "../../middleware/authMiddleware.js";

const router = express.Router();

// Create Review
router.post("/", isAuthenticated, createReview);

// Update Review
router.put("/:reviewId", isAuthenticated, updateReview);

// Get Single Review by Review ID
//router.get("/:reviewId", getReviewById);

// Delete Review
router.delete("/:reviewId", isAuthenticated, deleteReview);

export default router;
