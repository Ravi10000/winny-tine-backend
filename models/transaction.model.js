import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    paymentIntentId: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Initiated", "Success", "Fail"],
      default: "Initiated",
    },
    comment: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Transaction = mongoose.model("Transaction", TransactionSchema);

export default Transaction;
