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
    expiryDate: {
      type: Date,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Tip = mongoose.model("Tip", tipSchema);

export default Tip;
