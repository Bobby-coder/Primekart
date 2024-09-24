import express from "express";
import {
  createCategory,
  deleteCategory,
  updateCategory,
  getAllCategories,
  insertMultipleCategories,
} from "../../controllers/categoryController.js";

import {
  isAuthenticated,
  authorizeRoles,
} from "../../middleware/authMiddleware.js";

const router = express.Router();

// Create a category
router.post("/", isAuthenticated, authorizeRoles("admin"), createCategory);

// Get all categories
router.get("/", getAllCategories);

// Insert bulk categories
router.post(
  "/bulk-insert",
  isAuthenticated,
  authorizeRoles("admin"),
  insertMultipleCategories
);

// Update a category
router.put("/:id", isAuthenticated, authorizeRoles("admin"), updateCategory);

// Delete a category by ID
router.delete("/:id", isAuthenticated, authorizeRoles("admin"), deleteCategory);

export default router;
