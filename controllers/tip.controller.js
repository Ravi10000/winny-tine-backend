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
    const tip = await Tip.create({
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
      status: "success",
      message: "Tip Created Successfully",
      tip,
    });
  } catch (err) {
    next(err);
  }
}

export async function getTips(req, res) {
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
    console.log(err.message);
    res.status(500).json({ status: "error", message: err.message });
  }
}

export async function updateTip(req, res) {
  const {
    stockName,
    entryPrice,
    target,
    stopLoss,
    quantity,
    remark,
    expiryDate,
    tipId,
  } = req.body;

  if (!tipId) {
    return res.status(400).json({
      status: "error",
      message: "required fields: tipId",
    });
  }
  const tipData = {
    updatedBy: req.user._id,
  };

  if (expiryDate) {
    if (!Date.parse(expiryDate)) {
      return res.status(400).json({
        status: "error",
        message:
          "expiryDate should be a valid date, accepted format mm-dd-yyyy",
      });
    }
    tipData.expiryDate = expiryDate;
  }
  if (remark) {
    if (!["BUY", "SELL"].includes(remark)) {
      return res.status(400).json({
        status: "error",
        message: "remark should be either BUY or SELL",
      });
    }
    tipData.remark = remark;
  }
  if (entryPrice) {
    if (typeof entryPrice !== "number") {
      return res.status(400).json({
        status: "error",
        message: "entryPrice should be a number",
      });
    }
    tipData.entryPrice = entryPrice;
  }
  if (quantity) {
    if (typeof quantity !== "number") {
      return res.status(400).json({
        status: "error",
        message: "quantity should be a number",
      });
    }
    tipData.quantity = quantity;
  }

  if (target) tipData.target = target;
  if (stopLoss) tipData.stopLoss = stopLoss;
  if (stockName) tipData.stockName = stockName;
  try {
    const tip = await Tip.findByIdAndUpdate(tipId, tipData, { new: true });
    return res.status(201).json({
      status: "success",
      message: "Tip Updated Successfully",
      tip,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ status: "error", message: err.message });
  }
}
