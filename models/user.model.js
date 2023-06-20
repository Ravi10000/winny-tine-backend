import mongoose from "mongoose";
import referralCodeGenerator from "referral-code-generator";

const userSchema = new mongoose.Schema(
  {
    fullname: String,
    email: String,
    mobile: {
      type: String,
      unique: true,
      required: true,
    },
    username: {
      type: String,
    },
    countryCode: {
      type: String,
      default: "+91",
    },
    DOB: Date,
    gender: {
      type: String,
      enum: ["MALE", "FEMALE", "OTHERS"],
    },
    experience: {
      type: String,
      enum: ["BEGINNER", "INTERMEDIATE", "EXPERT"],
    },
    haveDemat: {
      type: String,
      enum: ["YES", "NO", "I WANT"],
    },
    country: String,
    city: String,
    profilePic: String,
    usertype: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    myReferralCode: {
      type: String,
      default: referralCodeGenerator.alpha("uppercase", 12),
      minLength: 12,
      maxLength: 12,
      unique: true,
    },
    referralCode: { type: String, minLength: 12, maxLength: 12 },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
