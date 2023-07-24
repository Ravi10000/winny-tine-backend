import Indices from "../models/indices.model.js";
import { createRequire } from "module";
const customRequire = createRequire(import.meta.url);
const dayjs = customRequire("dayjs");
var customParseFormat = customRequire("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

export async function addIndex(req, res, next) {
  const {
    name,
    strikePrice,
    targetPrice,
    stopLossPrice,
    quantity,
    remark,
    expiryDate,
    expiryTime,
  } = req.body;
  try {
    await Indices.create({
      name,
      strikePrice,
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
      message: "Index Created Successfully",
    });
  } catch (err) {
    next(err);
  }
}

export async function getIndices(req, res, next) {
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
    let indices = Indices.find({});
    if (order_by) {
      if (order_by === "latest") {
        indices.sort({ _id: -1 });
      }
    }
    if (size) {
      indices = indices.limit(size);
    }
    indices = await indices;
    if (status) {
      if (status === "active") {
        indices = indices.filter(
          (index) =>
            dayjs(
              `${index.expiryDate.trim()} ${index.expiryTime.trim()}`,
              "DD/MM/YYYY hh:mm A"
            ).valueOf() > Date.now()
        );
      } else {
        indices = indices.filter(
          (index) =>
            dayjs(
              `${index.expiryDate.trim()} ${index.expiryTime.trim()}`,
              "DD/MM/YYYY hh:mm A"
            ) < Date.now()
        );
      }
    }
    return res.status(200).json({
      success: true,
      status: "success",
      data: indices,
    });
  } catch (err) {
    next(err);
  }
}

export async function updateIndex(req, res, next) {
  const indexId = req.params.indexId;

  const indexData = {
    ...req.body,
    updatedBy: req.user._id,
  };

  try {
    await Indices.findByIdAndUpdate(indexId, indexData, { new: true });
    return res.status(200).json({
      success: true,
      status: "success",
      message: "Index Updated Successfully",
    });
  } catch (err) {
    next(err);
  }
}

export async function deleteIndex(req, res, next) {
  try {
    const indexId = req.params.indexId;
    await Indices.findByIdAndDelete(indexId);
    return res.status(200).json({
      success: true,
      status: "success",
      message: "Index Deleted Successfully",
    });
  } catch (error) {
    next(error);
  }
}
