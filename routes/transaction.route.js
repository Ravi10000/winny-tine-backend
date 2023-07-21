import express from "express";
import { fetchUser, isValidUser } from "../middlewares/auth.middleware.js";
import {
  createTransaction,
  updateTransaction,
  getAllTransaction,
} from "../controllers/transaction.controller.js";

const router = express.Router();

router.post("/", fetchUser, isValidUser, createTransaction);
router.put("/", fetchUser, isValidUser, updateTransaction);

router.get("/", fetchUser, isValidUser, getAllTransaction);

export default router;
