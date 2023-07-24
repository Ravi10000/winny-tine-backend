import Transaction from "../models/transaction.model.js";

export async function createTransaction(req, res, next) {
  try {
    const data = await Transaction.create({
      ...req.body,
      userid: req.user._id,
      status: "Initiated",
    });
    return res.status(200).json({
      status: "success",
      success: true,
      message: "Transaction Initiated Successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateTransaction(req, res, next) {
  try {
    const { status, comment, transactionId } = req.body;
    const update = {};
    if (status === "Success") {
      update.status = status;
      update.comment = comment;
    } else if (status === "Fail") {
      update.status = status;
    }
    const data = await Transaction.findByIdAndUpdate(transactionId, update);
    return res.status(200).json({
      status: "success",
      success: true,
      message: "Transaction Updated Successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
}

export async function getAllTransaction(req, res, next) {
  try {
    const data = await Transaction.find({ userid: req.user._id });
    return res.status(200).json({
      status: "success",
      success: true,
      message: "Transaction Fetched Successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
}
