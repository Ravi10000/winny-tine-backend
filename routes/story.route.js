import express from "express";
import {
  addStory,
  getStories,
  updateStory,
} from "../controllers/story.controllers.js";
import upload from "../middlewares/upload.middleware.js";
import { fetchUser, isValidUser } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post(
  "/",
  fetchUser,
  isValidUser,
  upload.fields([
    {
      name: "icon",
      maxCount: 1,
    },
    {
      name: "image",
      maxCount: 1,
    },
  ]),
  addStory
);
router.put(
  "/",
  fetchUser,
  isValidUser,
  upload.fields([
    {
      name: "icon",
      maxCount: 1,
    },
    {
      name: "image",
      maxCount: 1,
    },
  ]),
  updateStory
);

router.get("/", getStories);

export default router;
