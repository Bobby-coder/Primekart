import ErrorHandler from "../utils/errorHandler.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { updateAccessToken } from "../controllers/userController.js";
import User from "../models/userModel.js";

// load env variables
dotenv.config();

// It intercepts the request sent by user and verifies access token
export const isAuthenticated = async function (req, res, next) {
  try {
    // extract access token from cookies
    const access_token = req.cookies.access_token;

    // If access token is not present
    if (!access_token) {
      return next(
        new ErrorHandler("Please login to access this resource", 400)
      );
    }

    // If access token is present, then verify the token & extract the decoded object
    const decoded = jwt.decode(access_token);

    // If access token is not valid
    if (!decoded) {
      return next(new ErrorHandler("Access token is invalid", 400));
    }

    // check if the access token is expired
    if (decoded.exp && decoded.exp <= Date.now() / 1000) {
      await updateAccessToken(req, res, next);
    } else {
      // If access token is not expired then extract user id from decoded object
      const userId = decoded.id;
      if (!userId) {
        return next(new ErrorHandler("UserId not found", 400));
      }

      // add userId in request object
      req.user = userId;

      // forward request to next middleware or controller
      next();
    }
  } catch (err) {
    return next(new ErrorHandler(err.message, 500));
  }
};

// validate user role
export const authorizeRoles = (...roles) => {
  return async (req, res, next) => {
    // find user document, because user id is stored in request not user document
    const user = await User.findById(req.user);
    if (!roles.includes(user?.role || "")) {
      return next(
        new ErrorHandler(
          `Only admin is allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};
