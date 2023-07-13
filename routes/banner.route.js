import express from "express";
import {
  fetchUser,
  isAdmin,
  isValidUser,
} from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.middleware.js";
import {
  getAllBanners,
  addBanner,
  getBannerById,
  updateBanner,
  deleteBanner,
} from "../controllers/banner.controller.js";

const router = express.Router();

router.post(
  "/",
  fetchUser,
  isValidUser,
  isAdmin,
  upload.single("bannerImage"),
  addBanner
);

router.put(
  "/:bannerId",
  fetchUser,
  isValidUser,
  isAdmin,
  upload.single("bannerImage"),
  updateBanner
);

router.delete("/:bannerId", fetchUser, isValidUser, isAdmin, deleteBanner);

router.get("/:bannerId", getBannerById);

router.get("/", getAllBanners);

export default router;
