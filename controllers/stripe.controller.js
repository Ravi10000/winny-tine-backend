import configureStripe from "stripe";
import express from "express";
import validate from "../utils/validate.js";
const stripe = configureStripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});
import Transaction from "../models/transaction.model.js";
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

export const stripeWebhook = async (req, res) => {
  console.log("Webhook called");
  console.log(req.body);
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      //   JSON.stringify(req.body),
      sig,
      // TODO: replace this with your endpoint secret
      process.env.STRIPE_TEST_SECRET
    );
    console.log({ event });
  } catch (err) {
    console.log({ error: err.message });
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  console.log({ event });

  // Handle the event
  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntentSucceeded = event.data.object;
      console.log({ paymentIntentSucceeded });
      await Transaction.findOneAndUpdate(
        {
          paymentIntentId: paymentIntentSucceeded.client_secret,
        },
        {
          status: "Success",
        }
      );
      break;
    case "payment_intent.failed":
    case "payment_intent.cancelled":
      const paymentIntentFailed = event.data.object;
      console.log({ paymentIntentFailed });
      await Transaction.findOneAndUpdate(
        {
          paymentIntentId: paymentIntentFailed.client_secret,
        },
        {
          status: "Fail",
        }
      );
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
  res.status(200).json(JSON.stringify({ received: true }));
};

export const initiatePayment = async (req, res) => {
  const errors = validate(req);
  if (errors)
    return res.status(400).json({
      status: "error",
      message: "Validation Error",
      errors,
    });
  try {
    const { amount } = req.body;
    const customer = await stripe.customers.create();
    const ephemeralKey = await stripe.ephemeralKeys.create(
      { customer: customer.id },
      { apiVersion: "2022-11-15" }
    );
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "inr",
      customer: customer.id,
      automatic_payment_methods: {
        enabled: true,
      },
    });
    await Transaction.create({
      userid: req.user._id,
      paymentIntentId: paymentIntent.client_secret,
      amount,
    });

    res.status(201).json({
      paymentIntent: paymentIntent.client_secret,
      ephemeralKey: ephemeralKey.secret,
      customer: customer.id,
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

export const fetchTransaction = async (req, res) => {
  try {
    const { paymentIntentId } = req.params;
    const transaction = await Transaction.findOne({
      paymentIntentId,
      userid: req.user._id,
    });
    if (!transaction)
      return res.status(400).json({
        status: "error",
        message: "transaction not found or unauthorised",
      });
    res.status(200).json({
      status: "success",
      message: "transaction details",
      transaction,
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};
