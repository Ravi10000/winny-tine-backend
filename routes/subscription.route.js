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
  addUserSubscription,
  getUserSubscriptionByUserId,
  getUserSubscription,
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

router.post("/user-subscription", fetchUser, isValidUser, addUserSubscription);

router.get(
  "/user-subscription",
  fetchUser,
  isValidUser,
  getUserSubscriptionByUserId
);
router.get("/users-subscription", fetchUser, isValidUser, getUserSubscription);

export default router;
