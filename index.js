import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

// routes
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import supportRequestRoutes from "./routes/support-request.route.js";
import ratingRoutes from "./routes/rating.route.js";
import storyRoutes from "./routes/story.route.js";
import tipRoutes from "./routes/tip.route.js";
import subscriptionRoutes from "./routes/subscription.route.js";
import bannerRoutes from "./routes/banner.route.js";
import newsRoutes from "./routes/news.route.js";
import watchlistRoutes from "./routes/watchlist.route.js";
import stockRoutes from "./routes/stock.route.js";
import eventRoutes from "./routes/event.route.js";
import transactionRoutes from "./routes/transaction.route.js";
import eodRoutes from "./routes/eodtops.route.js";
import indicesRoutes from "./routes/indices.route.js";
import portfolioRoutes from "./routes/portfolio.route.js";
import stripeRoutes from "./routes/stripe.route.js";
import { stripeWebhook } from "./controllers/stripe.controller.js";

const app = express();

mongoose.connect(process.env.DB_URL);
mongoose.connection.on("error", (err) => {
  console.log("err", err);
});
mongoose.connection.on("connected", (err, res) => {
  console.log("DB connected");
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/support", supportRequestRoutes);
app.use("/api/rating", ratingRoutes);
app.use("/api/story", storyRoutes);
app.use("/api/tips", tipRoutes);
app.use("/api/subscriptions", subscriptionRoutes);
app.use("/api/banners", bannerRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/watchlist", watchlistRoutes);
app.use("/api/stocks", stockRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/transaction", transactionRoutes);
app.use("/api/eod", eodRoutes);
app.use("/api/indices", indicesRoutes);
app.use("/api/portfolio", portfolioRoutes);
app.use("/api/stripe", stripeRoutes);

app.post("/webhook", express.raw({ type: "application/json" }), stripeWebhook);
const PORT = process.env.PORT || 5000;

app.get("/api", (req, res) => {
  res.json({
    message: "Welcome to winny tine api.",
    apiUrl: `http://localhost:${PORT}/api`,
  });
});

app.listen(process.env.PORT, () => {
  console.log(`API URL: http://localhost:${PORT}/api`);
});
