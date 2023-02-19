import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export default async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get User from token
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (err) {
      res.status(401).json({ message: "Not Authorized" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not Authorized, No Token" });
  }
};
