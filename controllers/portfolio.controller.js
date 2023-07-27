import DematBal from "../models/dematBal.model.js";
import Portfolio from "../models/porfolio.model.js";
import Stock from "../models/stock.model.js";
import User from "../models/user.model.js";
import TradingBal from "../models/TradingBal.model.js";

export async function addPortfolio(req, res, next) {
  try {
    const userid = req.user._id;
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
    const user = await User.findById(userid);
    if (remark === "buy") {
      if (type === "delivery") {
        const dmtBalance = await DematBal.findOne({ symbol: symbol.name });
        if (dmtBalance) {
          dmtBalance.quantity = dmtBalance.quantity + quantity;
          dmtBalance.save();
        } else {
          await DematBal.create({
            userid,
            symbol: symbol.name,
            quantity,
          });
        }
      }
      if (type === "intraday") {
        const trdBalance = await TradingBal.findOne({ symbol: symbol.name });
        if (trdBalance) {
          trdBalance.quantity = trdBalance.quantity + quantity;
          trdBalance.save();
        }
        await TradingBal.create({
          userid,
          symbol: symbol.name,
          quantity,
        });
      }
      user.noofCoins = user.noofCoins - purchasePrice * quantity;
      user.save();
    }
    if (remark === "sell") {
      if (type === "delivery") {
        const dmtBalance = await DematBal.findOne({ symbol: symbol.name });
        if (dmtBalance) {
          dmtBalance.quantity = dmtBalance.quantity - quantity;
          dmtBalance.save();
        } else {
          await DematBal.create({
            userid,
            symbol: symbol.name,
            quantity,
          });
        }
      }
      if (type === "intraday") {
        const trdBalance = await TradingBal.findOne({ symbol: symbol.name });
        if (trdBalance) {
          trdBalance.quantity = trdBalance.quantity - quantity;
          trdBalance.save();
        }
        await TradingBal.create({
          userid,
          symbol: symbol.name,
          quantity,
        });
      }
      user.noofCoins = user.noofCoins + purchasePrice * quantity;
      user.save();
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

export async function getAllDematBalance(req, res, next) {
  try {
    const data = await DematBal.find({ userid: req.user._id });
    return res.status(200).json({
      status: "success",
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
}

export async function getAllTradingBalance(req, res, next) {
  try {
    const data = await TradingBal.find({ userid: req.user._id });
    return res.status(200).json({
      status: "success",
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
}
