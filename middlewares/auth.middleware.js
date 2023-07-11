import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const fetchUser = async (req, res, next) => {
  try {
    req.user = null;
    if (req?.headers?.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      if (token == "null" || !token) {
        return next();
      }
      const jwtExpiry = jwt.decode(token).exp;
      const now = Date.now() / 1000;

      if (jwtExpiry < now) {
        return next();
      }

      req.user = jwt.verify(token, process.env.JWT_SECRET);
    }
    next();
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err.message,
    });
  }
};

export const isAdmin = async (req, res, next) => {
  const user = req?.user;
  if (user?.usertype !== "ADMIN") {
    return res.status(401).json({ message: "Admin Access Denied" });
  }
  next();
};

export async function isValidUser(req, res, next) {
  if (!req.user) return res.status(401).json({ message: "Access Denied" });
  const user = await User.findById(req.user._id);
  if (!user) return res.status(401).json({ message: "Access Denied" });
  req.user = user;
  next();
}

export async function checkIfAdmin(req, res, next) {
  if (req.user.usertype === "ADMIN") req.user.isAdmin = true;
  else req.user.isAdmin = false;
  next();
}
