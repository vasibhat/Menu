import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
import connectDB from "./config/db.js";

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

import menuRoutes from "./routes/menuRoutes.js";

const port = process.env.PORT || 5000;

connectDB();

const app = express();

//Body paerser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Cookies parser middleware
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("API is running...");
});

// //Routes
app.use("/api/menu", menuRoutes);
// app.use("/api/orders", orderRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
