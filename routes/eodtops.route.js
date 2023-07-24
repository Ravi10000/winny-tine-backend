import express from "express";
import { getTopGainerAndLoser } from "../controllers/eodtops.controller.js";

const router = express.Router();

router.get("/", getTopGainerAndLoser);

export default router;
