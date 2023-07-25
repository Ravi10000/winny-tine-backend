import mongoose from "mongoose";

const TradingBalSchema = new mongoose.Schema(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    symbol: String,
    quantity: {
      type: Number,
      required: true,
    },
    purchasedAt: {
      type: Date,
      required: true,
    },
    soldAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const TradingBal = mongoose.model("TradingBal", TradingBalSchema);

export default TradingBal;
