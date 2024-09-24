import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  reviewerName: {
    type: String,
    required: true,
  },
  reviewerEmail: {
    type: String,
    required: true,
  },
  helpfulCount: { type: Number, default: 0 },
});

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discountPercentage: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  stock: {
    type: Number,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  brand: {
    type: String,
  },
  sku: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  dimensions: {
    width: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    depth: {
      type: Number,
      required: true,
    },
  },
  warrantyInformation: {
    type: String,
    required: true,
  },
  shippingInformation: {
    type: String,
    required: true,
  },
  availabilityStatus: {
    type: String,
    required: true,
  },
  reviews: [reviewSchema],
  returnPolicy: {
    type: String,
    required: true,
  },
  minimumOrderQuantity: {
    type: Number,
    required: true,
  },
  meta: {
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    barcode: {
      type: String,
      required: true,
    },
    qrCode: {
      type: String,
      required: true,
    },
  },
  images: {
    type: [String],
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema);
export default Product;
