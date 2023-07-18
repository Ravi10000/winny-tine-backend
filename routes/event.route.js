import express from "express";
import {
  fetchUser,
  isAdmin,
  isValidUser,
} from "../middlewares/auth.middleware.js";
import {
  activeUser,
  getAllActiveUser,
  getDailyActiveuser,
} from "../controllers/event.controller.js";

const router = express.Router();

router.post("/", fetchUser, isValidUser, activeUser);
router.get("/users", fetchUser, isValidUser, isAdmin, getAllActiveUser);
router.get("/users/daily", fetchUser, isValidUser, isAdmin, getDailyActiveuser);

export default router;
