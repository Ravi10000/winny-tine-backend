import mongoose from "mongoose";
import referralCodeGenerator from "referral-code-generator";

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phoneNumber: {
      type: String,
      unique: true,
      required: true,
    },
    countryCode: {
      type: String,
      required: true,
    },
    usertype: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    referralCode: {
      type: String,
      minLength: 12,
      maxLength: 12,
      unique: true,
    },
    referredBy: { type: String, minLength: 12, maxLength: 12 },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
