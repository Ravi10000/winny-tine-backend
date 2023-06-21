import express from "express";
import { body } from "express-validator";

import {
  fetchUser,
  isAdmin,
  isValidUser,
} from "../middlewares/auth.middleware.js";
import {
  checkUsernameAvailablility,
  getAllUsers,
  sendProfile,
  updateUserDetails,
} from "../controllers/user.controller.js";
import upload from "../middlewares/upload.middleware.js";

const router = express.Router();

router.put(
  "/",
  fetchUser,
  isValidUser,
  upload.single("profilePic"),
  updateUserDetails
);

router.get("/profile", fetchUser, isValidUser, sendProfile);
router.post(
  "/check-username",
  [body("username", "Username Required").notEmpty()],
  checkUsernameAvailablility
);
router.get("/", fetchUser, isValidUser, isAdmin, getAllUsers);

export default router;
