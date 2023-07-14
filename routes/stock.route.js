import express from "express";
import {
  fetchUser,
  isValidUser,
  isAdmin,
} from "../middlewares/auth.middleware.js";
import { uploadExcel } from "../middlewares/upload.middleware.js";
import {
  addStocks,
  getAllStocks,
  deleteStock,
} from "../controllers/stock.controller.js";

const router = express.Router();

router.post(
  "/",
  fetchUser,
  isValidUser,
  isAdmin,
  uploadExcel.single("file"),
  addStocks
);
router.get("/", getAllStocks);
router.delete("/:stockId", fetchUser, isValidUser, isAdmin, deleteStock);

export default router;
