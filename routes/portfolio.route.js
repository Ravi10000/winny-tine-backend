import express from "express";
import {
  addPortfolio,
  getAllDematBalance,
  getAllTradingBalance,
  getAllPortfolio,
} from "../controllers/portfolio.controller.js";
import { fetchUser, isValidUser } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", fetchUser, isValidUser, addPortfolio);
router.get("/", fetchUser, isValidUser, getAllPortfolio);
router.get("/demat-balance", fetchUser, isValidUser, getAllDematBalance);
router.get("/trading-balance", fetchUser, isValidUser, getAllTradingBalance);

export default router;
