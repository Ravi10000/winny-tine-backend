import Subscription from "../models/subscription.model.js";

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
      data,
    });
  } catch (error) {
    next(error);
  }
};
