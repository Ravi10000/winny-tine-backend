import express from "express";
import {
  fetchUser,
  isAdmin,
  isValidUser,
} from "../middlewares/auth.middleware.js";
import {
  addIndex,
  getIndices,
  updateIndex,
  deleteIndex,
} from "../controllers/indices.controller.js";

const router = express.Router();

router.post("/", fetchUser, isValidUser, isAdmin, addIndex);
router.put("/:indexId", fetchUser, isValidUser, isAdmin, updateIndex);
router.delete("/:indexId", fetchUser, isValidUser, isAdmin, deleteIndex);

router.get("/", getIndices);

export default router;
