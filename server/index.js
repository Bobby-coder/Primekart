import { app } from "./app.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import {cloudinaryConfig} from "./config/cloudinary.js"

// Load env variables
dotenv.config();

// config cloudinary
cloudinaryConfig();

// Start listening to app
app.listen(process.env.PORT, () => {
  console.log(`Server started at ${process.env.PORT}`);
  connectDB();
});
