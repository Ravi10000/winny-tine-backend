import express from "express";
import {
  fetchUser,
  isAdmin,
  isValidUser,
} from "../middlewares/auth.middleware.js";
import { activeUser, getActiveUser } from "../controllers/event.controller.js";

const router = express.Router();

router.post("/", fetchUser, isValidUser, activeUser);
router.get("/users", fetchUser, isValidUser, isAdmin, getActiveUser);

export default router;
