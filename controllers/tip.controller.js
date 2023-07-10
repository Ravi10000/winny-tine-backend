import Tip from "../models/tip.model.js";

export async function addTip(req, res, next) {
  const {
    stockName,
    entryPrice,
    targetPrice,
    stopLossPrice,
    quantity,
    remark,
    expiryDate,
  } = req.body;
  try {
    await Tip.create({
      stockName,
      entryPrice,
      targetPrice,
      stopLossPrice,
      quantity,
      remark,
      expiryDate,
      createdBy: req.user._id,
    });
    return res.status(201).json({
      success: true,
      message: "Tip Created Successfully",
    });
  } catch (err) {
    next(err);
  }
}

export async function getTips(req, res, next) {
  const { status } = req.query;
  if (status) {
    if (!["EXPIRED", "ACTIVE"].includes(status)) {
      return res.status(400).json({
        status: "error",
        message: "status should be either EXPIRED or ACTIVE",
      });
    }
  }
  try {
    let tips = await Tip.find({});
    if (status) {
      if (status === "ACTIVE") {
        tips = tips.filter((tip) => tip.expiryDate.valueOf() > Date.now());
      } else {
        tips = tips.filter((tip) => tip.expiryDate.valueOf() < Date.now());
      }
    }
    return res.status(200).json({
      success: true,
      data: tips,
    });
  } catch (err) {
    next(err);
  }
}

export async function updateTip(req, res, next) {
  const tipId = req.params.tipId;

  const tipData = {
    ...req.body,
    updatedBy: req.user._id,
  };

  try {
    await Tip.findByIdAndUpdate(tipId, tipData, { new: true });
    return res.status(200).json({
      success: true,
      message: "Tip Updated Successfully",
    });
  } catch (err) {
    next(err);
  }
}

export async function deleteTip(req, res, next) {
  try {
    const tipId = req.params.tipId;
    await Tip.findByIdAndDelete(tipId);
    return res.status(200).json({
      success: true,
      message: "Tip Deleted Successfully",
    });
  } catch (error) {
    next(err);
  }
}
