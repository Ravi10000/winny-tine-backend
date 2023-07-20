import Tip from "../models/tip.model.js";
import { createRequire } from "module";
const customRequire = createRequire(import.meta.url);
const dayjs = customRequire("dayjs");
var customParseFormat = customRequire("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

export async function addTip(req, res, next) {
  const {
    stockName,
    entryPrice,
    targetPrice,
    stopLossPrice,
    quantity,
    remark,
    expiryDate,
    expiryTime,
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
      expiryTime,
      createdBy: req.user._id,
    });
    return res.status(201).json({
      success: true,
      status: "success",
      message: "Tip Created Successfully",
    });
  } catch (err) {
    next(err);
  }
}

export async function getTips(req, res, next) {
  const { status, size, order_by } = req.query;
  if (status) {
    if (!["expired", "active"].includes(status)) {
      return res.status(400).json({
        success: false,
        status: "error",
        message: "status should be either expired or active",
      });
    }
  }
  if (order_by) {
    if (!["latest", "oldest"].includes(order_by)) {
      return res.status(400).json({
        success: false,
        status: "error",
        message: "order_by should be either latest or oldest",
      });
    }
  }
  try {
    let tips = Tip.find({});
    if (order_by) {
      if (order_by === "latest") {
        tips.sort({ _id: -1 });
      }
    }
    if (size) {
      tips = tips.limit(size);
    }
    tips = await tips;
    if (status) {
      if (status === "active") {
        tips = tips.filter(
          (tip) =>
            dayjs(
              `${tip.expiryDate.trim()} ${tip.expiryTime.trim()}`,
              "DD/MM/YYYY hh:mm A"
            ).valueOf() > Date.now()
        );
      } else {
        tips = tips.filter(
          (tip) =>
            dayjs(
              `${tip.expiryDate.trim()} ${tip.expiryTime.trim()}`,
              "DD/MM/YYYY hh:mm A"
            ) < Date.now()
        );
      }
    }
    return res.status(200).json({
      success: true,
      status: "success",
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
      status: "success",
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
      status: "success",
      message: "Tip Deleted Successfully",
    });
  } catch (error) {
    next(error);
  }
}
