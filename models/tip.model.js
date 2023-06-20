import mongoose from "mongoose";

const tipSchema = new mongoose.Schema(
  {
    stockName: {
      type: String,
    },
    entryPrice: {
      type: Number,
    },
    target: {
      type: String,
    },
    stopLoss: {
      type: String,
    },
    quantity: {
      type: Number,
    },
    remark: {
      type: String,
      enum: ["BUY", "SELL"],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);
