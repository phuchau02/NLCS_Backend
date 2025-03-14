import prisma from "../config/prisma";
import jwt from "jsonwebtoken";
import { sendResponse } from "./response";

export const getTaiKhoanByUserName = async (TenDangNhap) => {
  return prisma.taiKhoan.findFirst({
    where: {
      TenDangNhap,
    },
    include: {
      khachHang: true,
      nhanVien: true,
    },
  });
};

export const generateTokenAndSetCookies = (res, user) => {
  const secret = process.env.SECRET_KEY;
  if (!secret) {
    sendResponse(res, 500, "NO JWT SECRET FOUND");
    return;
  }

  const token = jwt.sign(
    { idTaiKhoan: user.idTaiKhoan, role: user.LoaiTaiKhoan },
    secret,
    {
      expiresIn: "7d",
    }
  );
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return token;
};

export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

export const generateResetToken = (idTaiKhoan) => {
  const secret = process.env.SECRET_KEY;
  return jwt.sign({ idTaiKhoan }, secret, { expiresIn: "10m" }); // Expires in 10 minutes
};
