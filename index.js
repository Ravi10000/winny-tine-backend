import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

// routes
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";

const app = express();

mongoose.connect(process.env.DB_URL);
mongoose.connection.on("error", (err) => {
  console.log("err", err);
});
mongoose.connection.on("connected", (err, res) => {
  console.log("mongoose is connected");
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorHandler);
app.use(express.static("uploads"));

function errorHandler(error, req, res, next) {
  console.log("failSafeHandler", error);
  res.status(500).json({ status: "error", message: error.message });
}

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

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
