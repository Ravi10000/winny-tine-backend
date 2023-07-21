import validate from "../utils/validate.js";

import User from "../models/user.model.js";

export async function updateUserDetails(req, res, next) {
  try {
    const {
      fullname,
      email,
      username,
      DOB,
      gender,
      experience,
      haveDemat,
      country,
      city,
      referralCode,
    } = req.body;
    const filename = req?.file?.filename;

    const dataToBeUpdated = {};
    if (filename) dataToBeUpdated.profilePic = filename;
    if (fullname) dataToBeUpdated.fullname = fullname;
    if (email) dataToBeUpdated.email = email;
    let couponCodeApplied = false;
    if (username) {
      const userExists = await User.findOne({
        username: username.toLowerCase(),
      });
      if (userExists) {
        return res.status(400).json({
          status: "error",
          message: "Username already exists. Please try another username",
        });
      }
      dataToBeUpdated.username = username.toLowerCase();
    }
    if (DOB) {
      if (!Date.parse(DOB)) {
        return res.status(400).json({
          status: "error",
          message: "Invalid Date of Birth",
        });
      }
      dataToBeUpdated.DOB = DOB;
    }
    if (gender) {
      if (!["MALE", "FEMALE", "OTHERS"].includes(gender)) {
        return res.status(400).json({
          status: "error",
          message:
            "Invalid gender value, valid values are MALE / FEMALE / OTHERS",
        });
      }
      dataToBeUpdated.gender = gender;
    }
    if (experience) {
      if (!["BEGINNER", "INTERMEDIATE", "EXPERT"].includes(experience)) {
        return res.status(400).json({
          status: "error",
          message:
            "Invalid experience value, valid values are BEGINNER / INTERMEDIATE / EXPERT",
        });
      }
      dataToBeUpdated.experience = experience;
    }
    if (haveDemat) {
      if (!["YES", "NO", "I WANT"].includes(haveDemat)) {
        return res.status(400).json({
          status: "error",
          message:
            "Invalid haveDemat value, valid values are YES / NO / I WANT",
        });
      }
      dataToBeUpdated.haveDemat = haveDemat;
    }
    if (country) dataToBeUpdated.country = country;
    if (city) dataToBeUpdated.city = city;

    if (referralCode) {
      if (!req.user.referralCode) {
        const referredByUser = await User.findOne({
          myReferralCode: referralCode.toUpperCase(),
        });
        if (referredByUser) {
          dataToBeUpdated.referralCode = referralCode.toUpperCase();
          couponCodeApplied = true;
          referredByUser.noofCoins = referredByUser.noofCoins + 100;
          referredByUser.save();
        } else {
          let error = new Error(`${referralCode} is not valid`);
          error.status = 404;
          throw error;
        }
      }
    }
    const newUser = await User.findByIdAndUpdate(
      req.user._id,
      dataToBeUpdated,
      {
        new: true,
      }
    );
    if (!newUser)
      return res
        .status(400)
        .json({ status: "error", message: "User Not Found" });

    res.status(200).json({
      success: true,
      status: "success",
      message: "User Details Updated Successfully",
      user: newUser,
      couponCodeApplied,
    });
  } catch (error) {
    next(error);
  }
}

export async function getAllUsers(req, res) {
  const data = await User.find({});
  res.status(200).json({
    success: true,
    status: "success",
    message: "All Users",
    data,
  });
}

export async function checkUsernameAvailablility(req, res) {
  const errors = validate(req);
  if (errors)
    return res.status(400).json({
      status: "error",
      message: "Validation Error",
      errors,
    });

  const { username } = req.body;
  const usernameExists = await User.findOne({
    username: username.toLowerCase(),
  });
  if (usernameExists) {
    return res.status(400).json({
      status: "error",
      message: "Username already exists. Please try another username",
    });
  }
  res.status(200).json({
    success: true,
    status: "success",
    message: "Username Available",
  });
}

export async function sendProfile(req, res) {
  res.status(200).json({
    success: true,
    status: "success",
    message: "Profile Details",
    user: req.user,
  });
}

export async function addCoinAmount(req, res, next) {
  try {
    const userid = req.user._id;
    const user = await User.findById(userid);
    user.noofCoins = user.noofCoins + (req.body.coins || 0);
    user.save();
    return res.status(200).json({
      status: "success",
      success: true,
      message: "Coins Added Successfully!",
    });
  } catch (error) {
    next(error);
  }
}
