import express from "express";
import {
  fetchUser,
  isAdmin,
  isValidUser,
} from "../middlewares/auth.middleware.js";
import {
  updateRequest,
  createSupportRequest,
  getAllSupportRequests,
  getMySupportRequests,
} from "../controllers/support-request.controller.js";

const router = express.Router();

router.post("/", fetchUser, isValidUser, createSupportRequest);
router.put("/", fetchUser, isValidUser, isAdmin, updateRequest);
router.get("/my-requests", fetchUser, isValidUser, getMySupportRequests);
router.get("/", fetchUser, isValidUser, isAdmin, getAllSupportRequests);

export default router;
