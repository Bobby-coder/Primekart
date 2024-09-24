import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // ID of the user owning the cart
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }], // Reference to products in the wishlist
  },
  { timestamps: true }
);

const Wishlist = mongoose.model("Wishlist", wishlistSchema);

export default Wishlist;
