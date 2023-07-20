import express from "express";
import upload from "../middlewares/upload.middleware.js";
import {
  fetchUser,
  isAdmin,
  isValidUser,
} from "../middlewares/auth.middleware.js";
import {
  addNews,
  deleteNews,
  getAllNews,
  getNewsById,
  updateNews,
} from "../controllers/news.controller.js";

const router = express.Router();

router.post(
  "/",
  fetchUser,
  isValidUser,
  isAdmin,
  upload.single("image"),
  addNews
);
router.put(
  "/:newsId",
  fetchUser,
  isValidUser,
  isAdmin,
  upload.single("image"),
  updateNews
);

router.get("/", getAllNews);
router.get("/:newsId", getNewsById);
router.delete("/:newsId", fetchUser, isValidUser, isAdmin, deleteNews);

export default router;
