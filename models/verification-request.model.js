import mongoose from "mongoose";

const verificationRequestSchema = new mongoose.Schema(
  {
    mobile: {
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
