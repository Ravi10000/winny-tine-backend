import mongoose from "mongoose";

const userSubscription = new mongoose.Schema(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
    },
    subscriptionPlanId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    transactionId: {
      type: String,
      unique: true,
      required: true,
    },
    amount: {
      type: String,
    },
    successDetails: {
      type: String,
    },
    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE"],
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
  },
  { timestamps: true }
);

const User = mongoose.model("UserSubscription", userSubscription);
export default User;
