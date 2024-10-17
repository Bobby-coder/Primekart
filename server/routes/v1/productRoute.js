import express from "express";
import {
  createProduct,
  getSingleProduct,
  getAllProductsByCategory,
  updateProduct,
  deleteProduct,
  insertBulkProducts,
  searchProducts,
} from "../../controllers/productController.js";

import {
  isAuthenticated,
  authorizeRoles,
} from "../../middleware/authMiddleware.js";

const router = express.Router();

// Create a product
router.post("/", isAuthenticated, authorizeRoles("admin"), createProduct);

// search products by query
router.get("/search", searchProducts);

// Get a single product
router.get("/:id", getSingleProduct);

// Get all products by category
router.get("/category/:categoryName", getAllProductsByCategory);

// Update a product
router.patch("/:id", isAuthenticated, authorizeRoles("admin"), updateProduct);

// Delete a product by ID
router.delete("/:id", isAuthenticated, authorizeRoles("admin"), deleteProduct);

// Insert products in bulk
router.post(
  "/bulk-insert",
  isAuthenticated,
  authorizeRoles("admin"),
  insertBulkProducts
);

// Upload images
/* router.post(
  "/image/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  uploadImages
);

// Delete product image
router.delete(
  "/image/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  deleteImage
); */

export default router;
