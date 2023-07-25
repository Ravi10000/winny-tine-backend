import mongoose from "mongoose";

const dematBalSchema = new mongoose.Schema(
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
  },
  { timestamps: true }
);

const DematBal = mongoose.model("DematBal", dematBalSchema);

export default DematBal;
