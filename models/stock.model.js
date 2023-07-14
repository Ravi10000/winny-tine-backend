import mongoose from "mongoose";

const StockSchema = new mongoose.Schema(
  {
    name: String,
    companyName: String,
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Stock = mongoose.model("Stock", StockSchema);

export default Stock;
