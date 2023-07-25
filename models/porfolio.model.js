import mongoose from "mongoose";

const portfolioSchema = new mongoose.Schema(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    symbolid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Stock",
    },
    quantity: {
      type: Number,
      required: true,
    },
    purchasePrice: {
      type: Number,
      required: true,
    },
    remark: {
      type: String,
      enum: ["buy", "sell"],
      lowercase: true,
      required: true,
    },
    type: {
      type: String,
      enum: ["delivery", "intraday"],
      lowercase: true,
      required: true,
    },
  },
  { timestamps: true }
);

const Portfolio = mongoose.model("Portfolio", portfolioSchema);

export default Portfolio;
