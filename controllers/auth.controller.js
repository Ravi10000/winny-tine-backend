import axios from "axios";
import User from "../models/user.model.js";
import VerificationRequest from "../models/verification-request.model.js";
import { customOtpGen } from "otp-gen-agent";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import uniqid from "uniqid";
dotenv.config();

export async function generateOTP(req, res) {
  try {
    const { mobile } = req.body;

    if (!mobile) {
      let err = new Error("Mobile is required");
      err.status = 200;
      throw err;
    }

    const otp = await customOtpGen({ length: 4, chars: "0123456789" });

    const otpHash = await bcrypt.hash(otp, 10);
    await VerificationRequest.create({
      mobile,
      otpHash,
    });

    const { data } = await axios.get(`${process.env.OTP_PROVIDER}/mt/SendSMS`, {
      params: {
        user: process.env.OTP_USER,
        password: process.env.OTP_PASSWORD,
        senderid: "STOCCK",
        channel: "trans",
        dcs: 0,
        flashsms: 0,
        number: mobile,
        text: `Dear customer, your OTP for registration is ${otp} do not share to anyone. Thank you OTPIMS`,
        route: 10,
      },
    });

    if (data.ErrorCode !== "000") {
      let err = new Error("Failed to send OTP");
      err.status = 400;
      throw err;
    }
    return res.status(200).json({
      success: true,
      status: "success",
      message: "OTP Generated Successfully",
    });
  } catch (error) {
    next(error);
  }
}

export async function verifyOTP(req, res) {
  const { mobile, otp } = req.body;

  if (!mobile || !otp) {
    return res.status(400).json({
      success: false,
      status: "fail",
      message: "mobile and otp are required",
    });
  }

  const verificationRequest = await VerificationRequest.findOne({
    mobile,
  }).sort({ createdAt: -1 });
  if (!verificationRequest) {
    return res.status(400).json({
      success: false,
      status: "fail",
      message: "OTP Not Found",
    });
  }

  const isOtpExpired =
    Date.now().valueOf() - verificationRequest.createdAt.valueOf() >
    1000 * 60 * 10;

  if (isOtpExpired) {
    return res.status(400).json({
      success: false,
      status: "fail",
      message: "OTP Expired",
    });
  }

  const isMatch = await bcrypt.compare(otp, verificationRequest.otpHash);
  if (!isMatch) {
    return res.status(400).json({
      success: false,
      status: "fail",
      message: "Incorrect OTP",
    });
  }

  const existingUser = await User.findOne({ mobile });
  if (existingUser) {
    const token = generateToken(existingUser);
    return res.status(200).json({
      success: true,
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
  });
  const token = generateToken(user);
  res.status(200).json({
    success: true,
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
