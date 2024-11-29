import express from "express";
import {
  createRazorpayOrder,
  verifyPayment,
} from "../../controllers/paymentController.js";

import { isAuthenticated } from "../../middleware/authMiddleware.js";

const router = express.Router();

router.post("/razorpay-order", isAuthenticated, createRazorpayOrder);

router.post("/verify-payment", isAuthenticated, verifyPayment);

export default router;
