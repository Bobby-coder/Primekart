import express from "express";
import {
  registerUser,
  activateUser,
  resetPasswordMail,
  resetPassword,
  changePassword,
  loginUser,
  logoutUser,
  getUserInfo,
  updateUserInfo,
  deleteUser,
  updateUserRoleByAdmin,
  getAllUsersForAdmin,
  updateUserEmail,
  verifyNewEmailOTP,
} from "../../controllers/userController.js";
import {
  authorizeRoles,
  isAuthenticated,
} from "../../middleware/authMiddleware.js";

const router = express.Router();

// User Registration
router.post("/", registerUser);

// Activate Account (if needed)
router.post("/activate", activateUser);

// User Login
router.post("/login", loginUser);

// User Logout
router.post("/logout", isAuthenticated, logoutUser);

// Reset Password Link
router.post("/reset-password", resetPasswordMail);

// Reset Password
router.put("/reset-password", resetPassword);

// Get Currently Loggedin User's Account Info
router.get("/", isAuthenticated, getUserInfo);

// Update Currently Loggedin User's Info
router.put("/", isAuthenticated, updateUserInfo);

// change email
router.put("/update-user-email", isAuthenticated, updateUserEmail);

// verify email otp
router.put("/verify-email-otp", isAuthenticated, verifyNewEmailOTP);

// Change Password
router.put("/password", isAuthenticated, changePassword);

// Get All Users (for Admin)
router.get(
  "/admin/",
  isAuthenticated,
  authorizeRoles("admin"),
  getAllUsersForAdmin
);

// Update User (by Admin)
router.put(
  "/admin/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  updateUserRoleByAdmin
);

// Delete User (by Admin)
router.delete(
  "/admin/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  deleteUser
);

export default router;
