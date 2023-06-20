import express from "express";
import { fetchUser, isValidUser } from "../middlewares/auth.middleware.js";
import { updateUserDetails } from "../controllers/user.controller.js";

const router = express.Router();

router.put("/", fetchUser, isValidUser, updateUserDetails);

export default router;
