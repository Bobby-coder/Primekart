import express from "express";
import userRouter from "./userRoute.js";
import productRouter from "./productRoute.js";
import reviewRouter from "./reviewRoutes.js";
import cartRouter from "./cartRoutes.js";
import wishlistRouter from "./wishlistRoutes.js";
import categoryRouter from "./categoryRoute.js";

const router = express.Router();

router.use("/users", userRouter);

router.use("/products", productRouter);

router.use("/reviews", reviewRouter);

router.use("/cart", cartRouter);

router.use("/wishlist", wishlistRouter);

router.use("/categories", categoryRouter);

export default router;
