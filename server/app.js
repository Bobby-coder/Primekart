import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { ErrorMiddleware } from "./middleware/errorMiddleware.js";
import dotenv from "dotenv";
import apiRoutes from "./routes/index.js";

// Load env variables
dotenv.config();

// Initialize express app
export const app = express();

// Body parser to attach data coming with request to request body
app.use(express.json({ limit: "50mb" }));

// Cookie parser so that we can add cookies from backend to browser or client
app.use(cookieParser());

// Cors to specify origin from where user request the end points
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// routes
app.use("/api", apiRoutes);

app.get('/test-cookie', (req, res) => {
  res.cookie('test_cookie', 'test_value', {
    httpOnly: false,
    sameSite: 'lax',
    secure: false,
    maxAge: 3600000, // 1 hour
  });
  res.send('Test cookie set');
});


// Test route
app.get("/test", (req, res, next) => {
  return res.status(200).json({
    success: true,
    message: "Test route",
  });
});

// Unknown route
app.all("*", (req, res, next) => {
  const err = new Error(`Route ${req.originalUrl} not found`);
  err.statusCode = 404;
  next(err);
});

// error middleware
app.use(ErrorMiddleware);
