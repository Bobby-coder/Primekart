import ErrorHandler from "../utils/errorHandler.js";
import { successResponse } from "../utils/successResponse.js";
import Razorpay from "razorpay";
import dotenv from "dotenv";

// Load env variables
dotenv.config();

export const createRazorpayOrder = async (req, res, next) => {
  try {
    const { amount } = req.body;

    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    const options = {
      amount: amount*100, // amount in smallest currency unit
      currency: "INR",
      receipt: `receipt_order_${crypto.randomUUID().slice(15)}`,
    };

    const order = await instance.orders.create(options);

    if (!order) return next(new ErrorHandler("Some error occured!", 500));

    res
      .status(200)
      .json(
        successResponse("Razorpay order created successfully", "order", order)
      );
  } catch (error) {
    return next(new ErrorHandler(error.error.description, 500));
  }
};

export const verifyPayment = async (req, res, next) => {
  try {
    // getting the details back from our font-end
    const {
      orderCreationId,
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
    } = req.body;

    // Creating our own digest
    // The format should be like this:
    // digest = hmac_sha256(orderCreationId + "|" + razorpayPaymentId, secret);
    const shasum = crypto.createHmac("sha256", "w2lBtgmeuDUfnJVp43UpcaiT");

    shasum.update(`${orderCreationId}|${razorpayPaymentId}`);

    const digest = shasum.digest("hex");

    // comaparing our digest with the actual signature
    if (digest !== razorpaySignature)
      return next(new ErrorHandler("Transaction not legit!", 400));

    // THE PAYMENT IS LEGIT & VERIFIED
    res.status(200).json(
      successResponse("Payment verified successfully", "data", {
        orderId: razorpayOrderId,
        paymentId: razorpayPaymentId,
      })
    );
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};
