import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// Load env variables
dotenv.config();

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, select: false },
    address: [{ type: mongoose.Schema.Types.ObjectId, ref: "Address" }], // Reference to the user's addresses
    phone: { type: String },
    avatar: {
      public_id: String,
      url: String,
    },
    role: {
      type: String,
      default: "customer",
    },
    token: {
      type: String,
      default: null,
    }, // token for reset password link
    tokenExpiry: {
      type: Date,
      default: null,
    }, // expiry for reset password token
    emailChangeOTP: {
      type: String,
      default: null,
    },
    emailChangeOTPExpiry: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

// pre middleware to hash password before saving to db
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// function to create access token
userSchema.methods.signInAccessToken = function () {
  return jwt.sign({ id: this._id }, process.env.ACCESS_TOKEN || "", {
    expiresIn: "5m",
  });
};

// function to create refresh token
userSchema.methods.signInRefreshToken = function () {
  return jwt.sign({ id: this._id }, process.env.REFRESH_TOKEN || "", {
    expiresIn: "3d",
  });
};

// compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
