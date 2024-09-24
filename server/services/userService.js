import ErrorHandler from "../utils/errorHandler.js";
import { successResponse } from "../utils/successResponse.js";
import User from "../models/userModel.js";

// get user by id
export const getUserById = async (id, res) => {
  try {
    const user = await User.findById(id);

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    res
      .status(200)
      .json(
        successResponse("User fetched successfully", "user", {
          name: user.name,
          email: user.email,
        })
      );
  } catch (err) {
    return next(new ErrorHandler(err.message, 500));
  }
};

// get all users
export const getAllUsers = async (req, res, next) => {
  try {
    // Find all products
    const users = await User.find();

    if (!users.length) {
      return next(new ErrorHandler("No user found", 404));
    }

    res
      .status(200)
      .json(successResponse("Users fetched successfully", "users", users));
  } catch (err) {
    return next(new ErrorHandler(err.message, 500));
  }
};

// update user role
export const updateUserRole = async (res, id, role) => {
  const user = await User.findByIdAndUpdate(id, { role }, { new: true });

  res
    .status(201)
    .json(successResponse("User role updated successfully", "user", user));
};
