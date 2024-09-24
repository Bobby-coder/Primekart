import User from "../models/userModel.js";
import { generateActivationToken } from "../utils/generateActivationToken.js";
import { passwordRegex } from "../utils/regexPatterns.js";
import sendMail from "../utils/sendMail.js";
import ErrorHandler from "../utils/errorHandler.js";
import jwt from "jsonwebtoken";
import {
  accessTokenOptions,
  refreshTokenOptions,
  setToken,
} from "../utils/setToken.js";
import crypto from "crypto";
import {
  getAllUsers,
  getUserById,
  updateUserRole,
} from "../services/userService.js";
import { successResponse } from "../utils/successResponse.js";
import bcrypt from "bcryptjs";

// register user
export const registerUser = async (req, res, next) => {
  try {
    let { name, email, password } = req.body;

    // validating the data
    if (!name || !email || !password) {
      return next(new ErrorHandler("All fields are required", 400));
    }

    const isEmailExists = await User.findOne({ email: email });

    if (isEmailExists) {
      return next(
        new ErrorHandler(
          "You are already registered, please login to continue",
          400
        )
      );
    }

    // password will be hashed by pre save middleware. It runs before saving changes to db.
    let user = {
      name,
      email,
      password,
    };

    const activationToken = generateActivationToken(user);

    const activationCode = activationToken.activationCode;

    const templateData = {
      user: { name: user.name },
      activationCode,
    };

    // send verification mail
    await sendMail({
      userEmail: user.email,
      subject: "Activate your account",
      templateName: "activation-mail.ejs",
      templateData,
    });

    res
      .status(201)
      .json(
        successResponse(
          `Please check your email: ${user.email} to activate your account!`,
          "activationToken",
          activationToken.token
        )
      );
  } catch (err) {
    return next(new ErrorHandler(err.message, 400));
  }
};

// activate user
export const activateUser = async (req, res, next) => {
  try {
    const { activationCode, activationToken } = req.body;

    const newUser = jwt.verify(
      activationToken,
      process.env.ACTIVATION_SECRET_KEY
    );

    if (!newUser) {
      next(new ErrorHandler("Invalid token", 500));
    }

    if (newUser.activationCode !== activationCode) {
      return next(new ErrorHandler("Wrong OTP", 400));
    }

    const { name, email, password } = newUser.user;

    // create new user
    const user = await User.create({
      name,
      email,
      password,
    });

    await user.save();

    const templateData = {
      user: { name: user.name },
    };

    // send welcome mail
    await sendMail({
      userEmail: user.email,
      subject: "Account created successfuly",
      templateName: "welcome-mail.ejs",
      templateData,
    });

    res
      .status(201)
      .json(
        successResponse(`Your account is activated successfully`, "user", user)
      );
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

// Login User
export const loginUser = async (req, res, next) => {
  try {
    // extract user email and password from request body
    const { email, password } = req.body;

    // If email or password is not entered
    if (!email || !password) {
      return next(new ErrorHandler("All fields are required", 400));
    }

    // If email & password are entered then check whether user is registered or not
    const user = await User.findOne({ email }).select("+password");

    // If user is not registered
    if (!user) {
      return next(
        new ErrorHandler(
          "Email is not registered, please register to login",
          400
        )
      );
    }

    // If user is registered then verify its password using comparePassword() function
    const isPasswordMatched = await user.comparePassword(password);

    // If password is wrong
    if (!isPasswordMatched) {
      return next(new ErrorHandler("Password is not correct", 400));
    }

    // Generate access & refresh token using jwt, then set them in cookie and send user in response
    setToken(user, 200, res);
  } catch (err) {
    return next(new ErrorHandler(err.message, 400));
  }
};

// Logout User
export const logoutUser = async (req, res, next) => {
  try {
    // Remove access token & refresh token from the cookie
    res.cookie("access_token", "", { maxAge: 1 });
    res.cookie("refresh_token", "", { maxAge: 1 });

    return res.status(200).json(successResponse(`Logged out successfully`));
  } catch (err) {
    return next(new ErrorHandler(err.message, 400));
  }
};

// reset password link
export const resetPasswordMail = async (req, res, next) => {
  try {
    // extract email from request body
    const { email } = req.body;

    // if email is not entered
    if (!email) {
      return next(new ErrorHandler("Enter your email", 400));
    }

    // Find user with specified email & select password because by default password is not selected in user schema
    const user = await User.findOne({ email: email });

    // if email is not registered
    if (!user) {
      return next(
        new ErrorHandler(
          `This email is not registered with us, enter a valid email`,
          400
        )
      );
    }

    const token = crypto.randomBytes(20).toString("hex");

    // Set the expiry time for the token (5 minutes from now)
    const tokenExpiry = new Date();
    tokenExpiry.setMinutes(tokenExpiry.getMinutes() + 5);

    user.token = token;
    user.tokenExpiry = tokenExpiry;

    await user.save();

    // Create a new link to reset passwork & append reset password token to it, this link will not work after 5 minutes because token expiry is 5 minutes
    const resetPasswordLink = `http://localhost:5173/reset-password/${token}`;

    // define data to send in email
    const data = { resetPasswordLink };

    // send reset password link in mail
    sendMail({
      userEmail: email,
      subject: "Reset Password",
      templateName: "reset-password.ejs",
      templateData: data,
    });
    return res
      .status(200)
      .json(
        successResponse(
          `Please check your email: ${user.email} to reset your account!`
        )
      );
  } catch (err) {
    return next(new ErrorHandler(err.message, 400));
  }
};

// reset password
export const resetPassword = async (req, res, next) => {
  try {
    // extract password, confirm password & resetPasswordToken from request body
    const { newPassword, confirmPassword, resetPasswordToken } = req.body;
    console.log({ newPassword, confirmPassword, resetPasswordToken });

    if (!newPassword || !confirmPassword) {
      return next(new ErrorHandler("All fields are required", 400));
    }

    if (!passwordRegex.test(newPassword)) {
      return next(
        new ErrorHandler(
          "Password should be 6 to 20 characters long with at least 1 numeric, 1 lowercase and 1 uppercase letter",
          400
        )
      );
    }

    if (!resetPasswordToken) {
      return next(new ErrorHandler("token not present", 400));
    }

    // match new password & confirm password
    if (newPassword !== confirmPassword) {
      return next(new ErrorHandler("Password do not match", 400));
    }

    const user = await User.findOne({ token: resetPasswordToken });

    // if user is not present
    if (!user) {
      return next(new ErrorHandler("User not found", 400));
    }

    // Check if token has expired
    const isExpiredOTP = user.tokenExpiry < new Date();

    if (isExpiredOTP) {
      return next(
        new ErrorHandler(
          "Link has expired! Please try again with new link",
          400
        )
      );
    }

    // update password in user document. New password will be hashed by pre save middleware. It runs before saving changes to db.
    user.password = newPassword;

    // Clear the token and expiry after password is reset
    user.token = null;
    user.tokenExpiry = null;

    // save changes to user model using save()
    await user.save();

    const templateData = {
      user: { name: user.name },
    };

    // send password reset successfuly mail
    await sendMail({
      userEmail: user.email,
      subject: "Password changed successfuly",
      templateName: "passwordChanged-mail.ejs",
      templateData,
    });

    // return success response
    return res
      .status(200)
      .json(successResponse("Password changed successfully"));
  } catch (err) {
    return next(new ErrorHandler(err.message, 400));
  }
};

// change password
export const changePassword = async (req, res, next) => {
  let { currentPassword, newPassword } = req.body;
  const userId = req.user;

  if (!currentPassword || !newPassword) {
    return next(new ErrorHandler("All fields are required", 400));
  }

  // validate newPassword pattern
  if (!passwordRegex.test(newPassword)) {
    return next(
      new ErrorHandler(
        "Password should be 6 to 20 characters long with at least 1 numeric, 1 lowercase and 1 uppercase letter",
        403
      )
    );
  }

  try {
    const user = await User.findById(userId).select("+password");

    if (!user) {
      return next(new ErrorHandler("User not found!", 400));
    }

    // verify current password using comparePassword() function
    const isPasswordMatched = await user.comparePassword(currentPassword);

    if (!isPasswordMatched) {
      return next(new ErrorHandler("Incorrect current password", 403));
    }

    // new password will be hashed by pre save middleware. It runs before saving changes to db.
    user.password = newPassword;
    await user.save();

    const templateData = {
      user: { name: user.name },
    };

    // send password changed successfuly mail
    await sendMail({
      userEmail: user.email,
      subject: "Password changed successfuly",
      templateName: "passwordChanged-mail.ejs",
      templateData,
    });

    return res
      .status(200)
      .json(successResponse("Password changed successfully"));
  } catch (err) {
    return next(new ErrorHandler(err.message, 400));
  }
};

// update access & refresh token
export const updateAccessToken = async (req, res, next) => {
  try {
    const refresh_token = req.cookies.refresh_token;

    // If refresh token is not present
    if (!refresh_token) {
      return next(
        new ErrorHandler("Please login to access this resource", 404)
      );
    }

    const decoded = jwt.verify(refresh_token, process.env.REFRESH_TOKEN);

    if (!decoded) {
      return next(new ErrorHandler("Refresh token is invalid", 400));
    }

    const userId = decoded.id;

    // create new access token
    const accessToken = jwt.sign({ id: userId }, process.env.ACCESS_TOKEN, {
      expiresIn: "5m",
    });

    // create new refresh token
    const refreshToken = jwt.sign({ id: userId }, process.env.REFRESH_TOKEN, {
      expiresIn: "3d",
    });

    req.user = userId;

    // set updated refresh and access token
    res.cookie("access_token", accessToken, accessTokenOptions);
    res.cookie("refresh_token", refreshToken, refreshTokenOptions);

    return next();
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

// get user info for loggedin user
export const getUserInfo = async (req, res, next) => {
  try {
    const userId = req.user;
    getUserById(userId, res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

// update user info
export const updateUserInfo = async (req, res, next) => {
  try {
    const { name } = req.body;
    const userId = req.user;

    if (!name) {
      return next(new ErrorHandler("Name is required!", 400));
    }

    const user = await User.findById(userId);
    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    user.name = name;

    await user?.save();

    res
      .status(201)
      .json(successResponse("User name updated successfully", "user", user));
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

// update user email
export const updateUserEmail = async (req, res, next) => {
  try {
    const { newEmail } = req.body;
    const userId = req.user;

    const isEmailExists = await User.findOne({ email: newEmail });

    if (isEmailExists) {
      return next(new ErrorHandler("This email is already in use!", 400));
    }

    const user = await User.findById(userId);
    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    // Generate OTP
    const activationCode = Math.floor(1000 + Math.random() * 9000).toString();
    // configure mail data
    const templateData = {
      user: { name: user.name },
      activationCode,
    };

    // save otp with expiry in db
    const hashedOTP = await bcrypt.hash(activationCode, 10);
    const emailChangeOTPExpiry = new Date();
    emailChangeOTPExpiry.setMinutes(emailChangeOTPExpiry.getMinutes() + 3);

    user.emailChangeOTP = hashedOTP;
    user.emailChangeOTPExpiry = emailChangeOTPExpiry;
    await user.save();

    // send verification mail
    await sendMail({
      userEmail: newEmail,
      subject: "Change your email",
      templateName: "change-mail.ejs",
      templateData,
    });

    res
      .status(200)
      .json(
        successResponse(
          `Please check your email: ${newEmail} to update your email address!`
        )
      );
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

// verify otp for email change
export const verifyNewEmailOTP = async (req, res, next) => {
  try {
    const { newEmail, otp } = req.body;
    const userId = req.user;

    const user = await User.findById(userId);
    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    const isCorrectOTP = await bcrypt.compare(otp, user.emailChangeOTP);

    if (!isCorrectOTP) {
      return next(new ErrorHandler("Invalid OTP", 403));
    }

    const isExpiredOTP = user.emailChangeOTPExpiry < new Date();

    if (isExpiredOTP) {
      return next(new ErrorHandler("OTP expired", 403));
    }

    // update email
    user.email = newEmail;
    // Clear the otp and expiry after email is updated
    user.emailChangeOTP = null;
    user.emailChangeOTPExpiry = null;
    await user.save();

    res.status(200).json(
      successResponse(`Your email is updated successfully`, "user", {
        name: user.name,
        email: user.email,
      })
    );
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

// get all users --- only for admin
export const getAllUsersForAdmin = async (req, res, next) => {
  try {
    getAllUsers(res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

// update user role --- only for admin
export const updateUserRoleByAdmin = async (req, res, next) => {
  try {
    const { email, role } = req.body;

    if (!email || !role) {
      return next(new ErrorHandler("Email and role are required!", 404));
    }

    const user = await User.findOne({ email });
    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    const userId = user._id;
    updateUserRole(res, userId, role);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

// delete user --- only for admin
export const deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id;

    // Find all products
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    res.status(200).json(successResponse("User deleted successfully"));
  } catch (err) {
    return next(new ErrorHandler(err.message, 500));
  }
};
