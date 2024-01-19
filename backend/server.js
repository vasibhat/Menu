import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
import connectDB from "./config/db.js";

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

import menuRoutes from "./routes/menuRoutes.js";

import menu from "./data/menu.js";

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

app.get("/api/menu", (req, res) => {
  res.json(menu);
});

app.get("/api/menu/:id", (req, res) => { 
  const menuItem = menu.find((m) => m._id == req.params.id); 
  if (menuItem) {
    res.json(menuItem);
  } else {
    res.status(404).send("Menu item not found");
  }
});



// Error handling
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
