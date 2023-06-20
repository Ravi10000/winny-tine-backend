import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const fetchUser = async (req, res, next) => {
  console.log("fetching user");
  console.log("body on fetch user ", req.body);
  console.log("params on fetch user ", req.params);
  console.log("query on fetch user ", req.query);
  console.log("files on fetch user ", req?.file);
  console.log("headers on fetch user ", req.headers);

  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    console.log({ token });
    if (token == "null" || !token) {
      req.user = null;
      return next();
    }
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    console.log("user fetched successfully");
    console.log({ user });
  } else {
    console.log("no user found");
  }
  next();
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
