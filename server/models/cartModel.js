import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true }, // ID of the user owning the cart
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId, // Reference to the product added by user in cart
          ref: "Product",
        },
        quantity: { type: Number },
      },
    ],
    savedForLater: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }], // Reference to the product saved for later
    totalAmount: { type: Number, default: 0 }, // Total amount of all products in the cart
    totalOriginalPrice: { type: Number, default: 0 }, // Total amount after applying discounts
    totalItems: { type: Number, default: 0 }, // Total number of items in the cart
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
