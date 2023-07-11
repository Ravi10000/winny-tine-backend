import express from "express";
import {
  fetchUser,
  isAdmin,
  isValidUser,
} from "../middlewares/auth.middleware.js";

import {
  addSubscription,
  getAllSubscription,
  updateSubscription,
  deleteSubscription,
} from "../controllers/subscription.controller.js";

const router = express.Router();

router.post("/", fetchUser, isValidUser, isAdmin, addSubscription);
router.put(
  "/:subscriptionId",
  fetchUser,
  isValidUser,
  isAdmin,
  updateSubscription
);
router.delete(
  "/:subscriptionId",
  fetchUser,
  isValidUser,
  isAdmin,
  deleteSubscription
);

router.get("/", getAllSubscription);

export default router;
