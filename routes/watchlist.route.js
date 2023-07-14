import express from "express";
import { fetchUser, isValidUser } from "../middlewares/auth.middleware.js";
import {
  addMySymbol,
  getMySymbolList,
  deleteMySymbol,
} from "../controllers/watchlist.controller.js";

const router = express.Router();

router.post("/", fetchUser, isValidUser, addMySymbol);
router.get("/", fetchUser, isValidUser, getMySymbolList);
router.delete("/:symbolId", fetchUser, isValidUser, deleteMySymbol);

export default router;
