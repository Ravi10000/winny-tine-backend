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
  // fileFilter: (req, file, cb) => {
  //   const filetype = file.mimetype;
  //   console.log({ filetype });
  //   if (
  //     filetype === "image/png" ||
  //     filetype === "image/jpg" ||
  //     filetype === "image/jpeg"
  //   ) {
  //     cb(null, true);
  //   } else {
  //     cb(null, false);
  //     return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
  //   }
  // },
});

const upload = multer({ storage });
export default upload;
