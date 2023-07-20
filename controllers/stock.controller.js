import { uploadPath } from "../middlewares/upload.middleware.js";
import Stock from "../models/stock.model.js";
import xlsx from "xlsx";

export async function addStocks(req, res, next) {
  try {
    if (req.file) {
      const jsonData = excelToJson(req.file).map((data) => ({
        ...data,
        addedBy: req.user._id,
      }));
      await Stock.insertMany(jsonData);
      return res.status(201).json({
        success: true,
        status: "success",
        message: "Stocks Uploaded Successfully",
      });
    } else {
      var err = new Error("Excel file is required");
      err.status = 403;
      throw err;
    }
  } catch (error) {
    next(error);
  }
}

export async function getAllStocks(req, res) {
  try {
    const data = await Stock.find({});
    return res.status(200).json({
      success: true,
      status: "success",
      message: "Stocks Sent Successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteStock(req, res, next) {
  try {
    const stockId = req.params.stockId;
    await Stock.findByIdAndDelete(stockId);
    return res.status(200).json({
      success: true,
      status: "success",
      message: "Stock Deleted Successfully",
    });
  } catch (error) {
    next(error);
  }
}

function excelToJson(file) {
  const excelFile = xlsx.readFile(`${uploadPath}/${file?.filename}`);
  const firstSheetName = excelFile?.SheetNames[0];
  const firstSheet = excelFile?.Sheets[firstSheetName];
  return xlsx?.utils?.sheet_to_json(firstSheet);
}
