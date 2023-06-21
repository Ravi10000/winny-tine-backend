import fs from "fs";
import { uploadPath } from "../middlewares/upload.middleware.js";

export function deleteFile(filename) {
  try {
    fs.unlinkSync(`${uploadPath}/${filename}`);
  } catch (err) {
    console.log(err.message);
  }
}
