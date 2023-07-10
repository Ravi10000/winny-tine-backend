import express from "express";
import {
  fetchUser,
  isAdmin,
  isValidUser,
} from "../middlewares/auth.middleware.js";
import {
  addTip,
  getTips,
  updateTip,
  deleteTip,
} from "../controllers/tip.controller.js";

const router = express.Router();

router.post("/", fetchUser, isValidUser, isAdmin, addTip);
router.put("/:tipId", fetchUser, isValidUser, isAdmin, updateTip);
router.delete("/:tipId", fetchUser, isValidUser, isAdmin, deleteTip);

router.get("/", getTips);

export default router;
