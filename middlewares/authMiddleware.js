import jwt, { TokenExpiredError } from "jsonwebtoken";
import dotenv from "dotenv";
import { sendResponse } from "../utils/response.js";
import { Request, Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../utils/authenticateRequest";
// Load biến môi trường từ .env
dotenv.config();

const authenticateToken = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return sendResponse(res, 401, "Unauthorized - No token provided");
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    if (!decoded) {
      return sendResponse(res, 401, "Unauthorized - Invalid token");
    }

    req.idTaiKhoan = decoded.idTaiKhoan;
    req.LoaiTaiKhoan = decoded.LoaiTaiKhoan;
    next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return sendResponse(res, 401, "Unauthorized - Token expired");
    }

    console.error("Error in authMiddleware:", error);
    return sendResponse(res, 500, "Internal server error");
  }
};

export default authenticateToken;
