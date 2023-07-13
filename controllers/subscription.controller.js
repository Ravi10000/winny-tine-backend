import Subscription from "../models/subscription.model.js";
import UserSubscription from "../models/user.subscription.model.js";

export const addSubscription = async (req, res, next) => {
  try {
    const { plan, price, features, validity } = req.body;
    await Subscription.create({
      plan,
      price,
      features,
      validity,
      createdBy: req.user._id,
    });
    return res.status(201).json({
      success: true,
      status: "success",
      message: "Subscription Created Successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getAllSubscription = async (req, res, next) => {
  try {
    const data = await Subscription.find({});
    return res.status(200).json({
      success: true,
      status: "success",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export async function updateSubscription(req, res, next) {
  const subscriptionId = req.params.subscriptionId;

  const subscriptionData = {
    ...req.body,
    updatedBy: req.user._id,
  };

  try {
    await Subscription.findByIdAndUpdate(subscriptionId, subscriptionData, {
      new: true,
    });
    return res.status(200).json({
      success: true,
      status: "success",
      message: "Subscription Updated Successfully",
    });
  } catch (err) {
    next(err);
  }
}

export async function deleteSubscription(req, res, next) {
  try {
    const subscriptionId = req.params.subscriptionId;
    await Subscription.findByIdAndDelete(subscriptionId);
    return res.status(200).json({
      success: true,
      status: "success",
      message: "Subscription Deleted Successfully",
    });
  } catch (error) {
    next(error);
  }
}

export async function addUserSubscription(req, res, next) {
  try {
    const {
      userid,
      subscriptionPlanId,
      transactionId,
      amount,
      successDetails,
      expiryDate,
    } = req.body;
    await UserSubscription.updateMany(
      { userid },
      { status: "INACTIVE" },
      {
        new: true,
      }
    );
    const userSub = await UserSubscription.create({
      userid,
      subscriptionPlanId,
      transactionId,
      amount,
      successDetails,
      status: "ACTIVE",
      expiryDate,
    });
    return res.status(201).json({
      success: true,
      status: "success",
      message: "User Subscription Created Successfully",
      userSub,
    });
  } catch (error) {
    next(error);
  }
}

export async function getUserSubscription(req, res, next) {
  try {
    const data = await UserSubscription.findOne({
      userid: req.user._id,
      status: "ACTIVE",
    });
    return res.status(201).json({
      success: true,
      status: "success",
      message: "User Subscription Got Successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
}

export async function getAllUserSubscription(req, res, next) {
  try {
    const data = await UserSubscription.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "userid",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $lookup: {
          from: "subscriptions",
          localField: "subscriptionPlanId",
          foreignField: "_id",
          as: "subscriptionPlan",
        },
      },
    ]).exec();
    return res.status(201).json({
      success: true,
      status: "success",
      data,
    });
  } catch (error) {
    next(error);
  }
}
