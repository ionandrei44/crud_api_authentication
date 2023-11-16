import jwt from "jsonwebtoken";

import User from "../models/userModel.js";

import { handleServerError } from "../utils/functions.js";

const auth = async (req, res, next) => {
  try {
    const jwtCookie = req.cookies["jwt-cookie"];

    if (!jwtCookie) {
      return res
        .status(401)
        .json({ message: "Not authorized, token not found" });
    }

    let decoded;

    try {
      decoded = jwt.verify(jwtCookie, process.env.JWT_SECRET);
    } catch (error) {
      return res.status(401).json({ message: "Not authorized, invalid token" });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res
        .status(401)
        .json({ message: "Not authorized, user not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    handleServerError(res, error);
  }
};

export default auth;
