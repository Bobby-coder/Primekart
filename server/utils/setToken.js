import dotenv from "dotenv";
import { successResponse } from "./successResponse.js";

// load env variables
dotenv.config();

// Options object for Access Token
export const accessTokenOptions = {
  maxAge: 3 * 60 * 60 * 1000,
  httpOnly: false, // Prevent access from client-side JS
  sameSite: "lax",
  secure: false, // Send cookie only over HTTPS
};

// Options object for Refresh Token
export const refreshTokenOptions = {
  maxAge: 3 * 24 * 60 * 60 * 1000,
  httpOnly: false, // Prevent access from client-side JS
  sameSite: "lax",
  secure: false, // Send cookie only over HTTPS
};

// setToken function - this function generates access & refresh token, save them in cookie and send access token in response
export function setToken(user, statusCode, res) {
  // generate access token & refresh token
  const accessToken = user.signInAccessToken();
  const refreshToken = user.signInRefreshToken();

  // Set secure property of access token options object to true only in production mode
  if (process.env.NODE_DEV === "production") {
    accessTokenOptions.secure = true;
  }

  // Save the Access & Refresh Token to cookie
  res.cookie("refresh_token", refreshToken, refreshTokenOptions);
  res.cookie("access_token", accessToken, accessTokenOptions);

  // Send user in success response
  res.status(201).json(
    successResponse(`Logged in successfully`, "user", {
      name: user.name,
      email: user.email,
    })
  );
}
