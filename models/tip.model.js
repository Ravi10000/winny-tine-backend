import mongoose from "mongoose";

const tipSchema = new mongoose.Schema(
  {
    stockName: {
      type: String,
      required: true,
    },
    entryPrice: {
      type: Number,
      required: true,
    },
    targetPrice: {
      type: Number,
      required: true,
    },
    stopLossPrice: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    remark: {
      type: String,
      enum: ["buy", "sell"],
      lowercase: true,
      required: true,
    },
    expiryDate: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: function (v) {
          return /\d{2}\/\d{2}\/\d{4}/.test(v);
        },
        message: (props) =>
          `${props.value} is not a valid format!, accpeted format is DD/MM/YYYY`,
      },
    },
    expiryTime: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: function (v) {
          return /\d{2}:\d{2} (AM|PM)/.test(v);
        },
        message: (props) =>
          `${props.value} is not a valid format!, accpeted format is hh:mm (AM|PM)`,
      },
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
