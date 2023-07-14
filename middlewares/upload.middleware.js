import multer from "multer";
import path from "path";
import * as url from "url";

export const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
export const uploadPath = path.join(path.dirname(__dirname), "uploads");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const imageFileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error("You can upload only image files!"), false);
  }
  cb(null, true);
};

const excelFileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(xlsx|xls|csv)$/)) {
    return cb(
      new Error("You can upload only .xlsx, .xls and .csv files!"),
      false
    );
  }
  cb(null, true);
};

const upload = multer({ storage, fileFilter: imageFileFilter });
export const uploadExcel = multer({ storage, fileFilter: excelFileFilter });
export default upload;
