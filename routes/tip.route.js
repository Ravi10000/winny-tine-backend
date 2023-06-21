import express from "express";
import {
  fetchUser,
  isAdmin,
  isValidUser,
} from "../middlewares/auth.middleware.js";
import { addTip, getTips, updateTip } from "../controllers/tip.controller.js";

const router = express.Router();

router.post("/", fetchUser, isValidUser, isAdmin, addTip);
router.put("/", fetchUser, isValidUser, isAdmin, updateTip);

router.get("/", getTips);

export default router;
