import DematBal from "../models/dematBal.model.js";
import Portfolio from "../models/porfolio.model.js";
import Stock from "../models/stock.model.js";

export async function addPortfolio(req, res, next) {
  try {
    const { symbolid, quantity, purchasePrice, remark, type } = req.body;
    await Portfolio.create({
      symbolid,
      quantity,
      purchasePrice,
      remark,
      type,
      userid: req.user._id,
    });
    const symbol = await Stock.findById(symbolid);
    if (remark === "buy") {
      await DematBal.create({
        userid,
        symbol: symbol.name,
        quantity,
      });
    }
    return res.status(200).json({
      status: "success",
      success: true,
      message: "Successfully Added!",
    });
  } catch (error) {
    next(error);
  }
}

export async function getAllPortfolio(req, res, next) {
  try {
    const data = await Portfolio.find({});
    return res.status(200).json({
      status: "success",
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
}
