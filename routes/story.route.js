import express from "express";
import {
  addStory,
  deleteStory,
  getStories,
  getStoryById,
  updateStory,
} from "../controllers/story.controller.js";
import upload from "../middlewares/upload.middleware.js";
import {
  fetchUser,
  isAdmin,
  isValidUser,
} from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post(
  "/",
  fetchUser,
  isValidUser,
  isAdmin,
  upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
    {
      name: "profileImage",
      maxCount: 1,
    },
  ]),
  addStory
);
router.put(
  "/:storyId",
  fetchUser,
  isValidUser,
  isAdmin,
  upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
    {
      name: "profileImage",
      maxCount: 1,
    },
  ]),
  updateStory
);

router.get("/", getStories);
router.get("/:storyId", getStoryById);
router.delete("/:storyId", fetchUser, isValidUser, isAdmin, deleteStory);

export default router;
