import User from "../models/user.model.js";
import VerificationRequest from "../models/verification-request.model.js";
import { customOtpGen } from "otp-gen-agent";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// import ReferralCodeGenerator from "referral-code-generator";
import uniqid from "uniqid";

export async function generateOTP(req, res) {
  const { mobile } = req.body;

  if (!mobile) {
    return res.status(400).json({
      success : false,
      status: "fail",
      message: "mobile required",
    });
  }

  //todo
  // const otp = await customOtpGen({ length: 4, chars: "0123456789" });
  // console.log({ otp });

  const otp = "1111";

  const otpHash = await bcrypt.hash(otp, 10);
  await VerificationRequest.create({
    mobile,
    otpHash,
  });

  res.status(200).json({
    success : true,
    status: "success",
    message: "OTP Generated Successfully",
  });
}

export async function verifyOTP(req, res) {
  const { mobile, otp } = req.body;

  if (!mobile || !otp) {
    return res.status(400).json({
      success : false,
      status: "fail",
      message: "mobile and otp are required",
    });
  }

  const verificationRequest = await VerificationRequest.findOne({
    mobile,
  }).sort({ createdAt: -1 });
  if (!verificationRequest) {
    return res.status(400).json({
      success : false,
      status: "fail",
      message: "OTP Not Found",
    });
  }

  const isOtpExpired =
    Date.now().valueOf() - verificationRequest.createdAt.valueOf() >
    1000 * 60 * 10;

  if (isOtpExpired) {
    return res.status(400).json({
      success : false,
      status: "fail",
      message: "OTP Expired",
    });
  }

  const isMatch = await bcrypt.compare(otp, verificationRequest.otpHash);
  if (!isMatch) {
    return res.status(400).json({
      success : false,
      status: "fail",
      message: "Incorrect OTP",
    });
  }

  const existingUser = await User.findOne({ mobile });
  if (existingUser) {
    const token = generateToken(existingUser);
    return res.status(200).json({
      success : true,
      status: "success",
      message: "OTP Verified Successfully",
      user: existingUser,
      token,
    });
  }
  const user = await User.create({
    mobile,
    myReferralCode: uniqid(),
    isVerified: true,
    // ReferralCodeGenerator.alpha("uppercase", 8) + mobile.toString().slice(-4),
  });
  const token = generateToken(user);
  res.status(200).json({
    success : true,
    status: "success",
    message: "OTP Verified Successfully",
    user,
    token,
  });
}

function generateToken(user) {
  return jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
}
