import Watchlist from "../models/watchlist.model.js";

export async function addMySymbol(req, res, next) {
  try {
    await Watchlist.create({
      ...req.body,
      userid: req.user._id,
    });
    return res.status(201).json({
      success: true,
      status: "success",
      message: "Symbol Created Successfully",
    });
  } catch (error) {
    next(error);
  }
}

export async function getMySymbolList(req, res, next) {
  try {
    const data = await Watchlist.find({ userid: req.user._id });
    return res.status(200).json({
      success: true,
      status: "success",
      data,
    });
  } catch (error) {
    next(error);
  }
}

export function deleteMySymbol(req, res, next) {
  const symbolId = req.params.symbolId;
  Watchlist.findById(symbolId)
    .then((data) => {
      if (data) {
        if (!data.userid.equals(req.user._id)) {
          var err = new Error("You are not authorized to delete this symbol!");
          err.status = 403;
          return next(err);
        }
        Watchlist.findByIdAndRemove(symbolId)
          .then(() => {
            return res.status(200).json({
              success: true,
              status: "success",
              message: "Symbol Deleted Successfully",
            });
          }, next)
          .catch((err) => next(err));
      } else {
        err = new Error("Symbol " + symbolId + " not found");
        err.status = 404;
        return next(err);
      }
    })
    .catch(next);
}
