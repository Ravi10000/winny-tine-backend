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
app.use(express.static("uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/support", supportRequestRoutes);
app.use("/api/rating", ratingRoutes);
app.use("/api/story", storyRoutes);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to winny tine api.",
    apiUrl: `http://localhost:${PORT}/api`,
  });
});

app.listen(process.env.PORT, () => {
  console.log(`API URL: http://localhost:${PORT}/api`);
});
