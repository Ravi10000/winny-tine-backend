import axios from "axios";
import dotenv from "dotenv";
import Stock from "../models/stock.model.js";
import dayjs from "dayjs";
import fs from "fs";
import path from "path";
import { uploadPath } from "../middlewares/upload.middleware.js";
dotenv.config();

export function getTopGainerAndLoser(req, res, next) {
  const date = dayjs().format("DD-MM-YYYY");
  const filename = [date, "EOD.json"].join("_");
  const pathname = path.join(uploadPath, filename);
  fs.readFile(pathname, function (err, data) {
    if (data) {
      return res.status(200).json({
        success: true,
        status: "success",
        data: JSON.parse(data),
      });
    }
    Stock.find({})
      .then(async (stocks) => {
        const jsonData = {
          topGainer: [],
          topLoser: [],
        };
        for (let i = 0; i < stocks.length; i++) {
          if (jsonData.topGainer.length > 5 && jsonData.topLoser.length > 5)
            break;
          const stock = stocks[i];
          const symbol = stock.name;
          const { data } = await axios.get(
            "http://api.marketstack.com/v1/eod",
            {
              params: {
                access_key: process.env.MARKET_STACK_ACCESS_KEY,
                symbols: symbol,
                limit: 1,
              },
            }
          );
          const { open, close } = data.data[0];
          const isGainer = close - open > 0;
          const isLoser = close - open < 0;
          if (isGainer) jsonData.topGainer.push(stock);
          if (isLoser) jsonData.topLoser.push(stock);
        }
        return jsonData;
      })
      .then((data) => {
        fs.writeFile(pathname, JSON.stringify(data), function (err) {
          if (err) {
            throw err;
          }
          fs.readFile(pathname, function (err, data) {
            return res.status(200).json({
              success: true,
              status: "success",
              data: JSON.parse(data),
            });
          });
        });
      })
      .catch(next);
  });
}
