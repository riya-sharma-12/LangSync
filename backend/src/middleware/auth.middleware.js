import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protectRoute = async (req, res, next) => {
  try {
    // we have imported cookie parser in server.js
    // thatswhy we were able to access the cookie here
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No token provided" });
    }

    // jwt has this verify method for verifying if the token exist
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }

    // kyuki yaad ho tumhe to hmne token user id se banaya tha jo id
    // automatically database me create ho jati hai mongodb me

    // here we are removing password from the user
    // yaha user me ab saara data aa gya user ka
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({ message: "Unauthorized - User not found" });
    }


    // we are attaching the authenticated user's data to the req (request) object, 
    // so that the next middleware or route handler can easily access information 
    // about the logged-in user.
    req.user = user;

    next();
  } catch (error) {
    console.log("Error in protectRoute middleware", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};