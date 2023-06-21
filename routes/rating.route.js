import express from "express";
import {
  fetchUser,
  isAdmin,
  isValidUser,
} from "../middlewares/auth.middleware.js";
import {
  add_n_updateRating,
  getAllRatings,
  getMyRating,
} from "../controllers/rating.controller.js";

const router = express.Router();

router.post("/", fetchUser, isValidUser, add_n_updateRating);

router.get("/all", fetchUser, isValidUser, isAdmin, getAllRatings);
router.get("/", fetchUser, isValidUser, getMyRating);
export default router;
