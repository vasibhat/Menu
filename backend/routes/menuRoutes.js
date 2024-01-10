import express from "express";
const router = express.Router();

import {
  getMenuItems,
  getMenuItemById,
} from "../controllers/menuController.js";

router.route("/").get(getMenuItems);
router.route("/:id").get(getMenuItemById);

export default router;
