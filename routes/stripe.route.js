import express from "express";
import {
  fetchTransaction,
  initiatePayment,
} from "../controllers/stripe.controller.js";
import { body, param } from "express-validator";
import { fetchUser, isValidUser } from "../middlewares/auth.middleware.js";
const router = express.Router();

// router.post("/", express.raw({ type: "application/json" }), stripeWebhook);
router.post(
  "/initiate-payment",
  fetchUser,
  isValidUser,
  [
    body("amount")
      .isNumeric()
      .withMessage("invalid amount, amount should be a number")
      .notEmpty()
      .withMessage("amount required"),
  ],
  initiatePayment
);

router.get(
  "/check-status/:paymentIntentId",
  fetchUser,
  isValidUser,
  [
    param("paymentIntentId")
      .notEmpty()
      .withMessage("payment intent id required"),
  ],
  fetchTransaction
);

export default router;
