import mongoose from "mongoose";

const verificationRequestSchema = new mongoose.Schema(
  {
    phoneNumber: {
      type: String,
      required: true,
    },
    countryCode: {
      type: String,
      required: true,
    },
    otpHash: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const VerificationRequest = mongoose.model(
  "VerificationRequest",
  verificationRequestSchema
);
export default VerificationRequest;
