import mongoose from "mongoose";

const SubscriptionSchema = new mongoose.Schema(
  {
    plan: {
      type: String,
      required: true,
    },
    validity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    features: {
      type: [String],
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
  {
    timestamps: true,
  }
);

const Subscription = mongoose.model("Subscription", SubscriptionSchema);

export default Subscription;
