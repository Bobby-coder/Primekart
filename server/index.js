import { app } from "./app.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";

// Load env variables
dotenv.config();

// Start listening to app
app.listen(process.env.PORT, () => {
  console.log(`Server started at ${process.env.PORT}`);
  connectDB();
});
