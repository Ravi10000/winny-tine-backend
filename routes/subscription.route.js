import express from "express";
import {
  fetchUser,
  isAdmin,
  isValidUser,
} from "../middlewares/auth.middleware.js";

import {
  addSubscription,
  getAllSubscription,
} from "../controllers/subscription.controller.js";

const router = express.Router();

router.post("/", fetchUser, isValidUser, isAdmin, addSubscription);

router.get("/", getAllSubscription);

export default router;
