// Import thư viện bên ngoài
import bcrypt from "bcrypt";
import crypto from "crypto";
import { LoaiTaiKhoan } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

// Import tiện ích
import { generateTokenAndSetCookies, sendResponse } from "../utils/response";
import { isValidObjectId } from "../utils/validObject";
// import { sendResetPasswordEmail, sendResetPasswordSuccessEmail } from "../utils/sendEmail";

// Import service
import taiKhoanService from "../services/taiKhoan.services";
import khachHangService from "../services/khachHang.service";
import nhanVienService from "../services/nhanVien.service";

// Import Prisma
import prisma from "../config/prisma";

// Đăng ký tài khoản khách hàng
export const signup = async (req, res, next) => {
  const user = req.body;
  try {
    const existAccount = await taiKhoanService.getTaiKhoanByUserNameOrEmail(
      user.TenDangNhap
    );
    if (existAccount) {
      return sendResponse(res, 400, "Tài khoản hoặc mật khẩu đã tồn tại");
    }

    const newAccount = await taiKhoanService.createTaiKhoan({
      TenDangNhap: user.TenDangNhap.toLowerCase(),
      MatKhau: user.MatKhau,
      LoaiTaiKhoan: LoaiTaiKhoan.KHACH_HANG,
    });

    let newUser;
    try {
      newUser = await khachHangService.createKhachHang({
        TenKhachHang: user.TenKhachHang,
        Email: user.Email,
        DiaChi: user.DiaChi,
        DienThoai: user.DienThoai,
        TaiKhoan: newAccount.idTaiKhoan,
      });
    } catch (error) {
      console.error(error);
      if (newAccount) {
        await taiKhoanService.deleteTaiKhoanById(newAccount.idTaiKhoan);
      }
      return sendResponse(res, 400, "Thông tin người dùng không hợp lệ");
    }

    generateTokenAndSetCookies(res, newAccount);
    const { MatKhau, ...noPasswordUser } = newAccount;
    sendResponse(res, 201, "Đăng ký tài khoản thành công", noPasswordUser);
  } catch (error) {
    next(error);
  }
};

// Đăng nhập tài khoản
export const login = async (req, res, next) => {
  const { TenDangNhap, MatKhau } = req.body;
  try {
    const user = await taiKhoanService.login(
      TenDangNhap.toLowerCase(),
      MatKhau
    );
    if (!user) {
      return sendResponse(res, 400, "Tài khoản hoặc mật khẩu không đúng");
    }

    generateTokenAndSetCookies(res, user);
    sendResponse(res, 200, "Đăng nhập thành công", {
      ...user,
      MatKhau: undefined,
    });
  } catch (error) {
    next(error);
  }
};

// Quên mật khẩu
export const forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await taiKhoanService.getTaiKhoanByEmail(email);
    if (!user) {
      return sendResponse(res, 404, "Email không tồn tại");
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiesAt = new Date(Date.now() + 1000 * 60 * 10); // 10 phút

    await taiKhoanService.updateTaiKhoanById(user.idTaiKhoan, {
      resetPasswordToken: resetToken,
      resetPasswordExpiresAt: resetTokenExpiesAt,
    });

    // await sendResetPasswordEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);
    sendResponse(res, 200, "Reset password email sent");
  } catch (error) {
    next(error);
  }
};

// Reset mật khẩu
export const resetPassword = async (req, res, next) => {
  try {
    const token = req.params.token;
    const { MatKhau } = req.body;

    const user = await taiKhoanService.getTaiKhoanByResetToken(token);
    if (!user) {
      return sendResponse(res, 400, "Invalid or expired token");
    }

    const hashedPassword = await bcrypt.hash(MatKhau, 10);
    await taiKhoanService.updateTaiKhoanById(user.idTaiKhoan, {
      MatKhau: hashedPassword,
      resetPasswordToken: null,
      resetPasswordExpiresAt: null,
    });

    // await sendResetPasswordSuccessEmail(user.email);
    sendResponse(res, 200, "Password reset successfully");
  } catch (error) {
    next(error);
  }
};

// Kiểm tra xác thực
export const checkAuth = async (req, res, next) => {
  try {
    if (!req.userId) {
      return sendResponse(res, 400, "Invalid user ID");
    }

    const user = await taiKhoanService.getTaiKhoanById(req.userId);
    if (!user) {
      return sendResponse(res, 404, "User not found");
    }

    const { MatKhau, ...noPasswordUser } = user;
    sendResponse(res, 200, "Authenticated", noPasswordUser);
  } catch (error) {
    next(error);
  }
};

// Cập nhật tài khoản
export const updateAccount = async (req, res, next) => {
  const { idTaiKhoan } = req.params;
  if (!isValidObjectId(idTaiKhoan)) {
    return sendResponse(res, 400, "ID tài khoản không hợp lệ");
  }

  try {
    const updatedAccount = await taiKhoanService.updateTaiKhoanById(
      idTaiKhoan,
      req.body
    );
    if (!updatedAccount) {
      return sendResponse(res, 404, "Không tìm thấy tài khoản");
    }

    const { MatKhau, ...noPasswordAccount } = updatedAccount;
    return sendResponse(
      res,
      200,
      "Cập nhật tài khoản thành công",
      noPasswordAccount
    );
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return sendResponse(res, 404, "Không tìm thấy tài khoản");
    }
    next(error);
  }
};

// Đổi mật khẩu
export const changePassword = async (req, res, next) => {
  const { idTaiKhoan } = req.params;
  if (!isValidObjectId(idTaiKhoan)) {
    return sendResponse(res, 400, "ID tài khoản không hợp lệ");
  }

  try {
    const { currentPassword, newPassword, rePassword } = req.body;
    if (newPassword !== rePassword) {
      return sendResponse(
        res,
        400,
        "Mật khẩu mới và xác nhận mật khẩu không khớp"
      );
    }

    if (newPassword.length < 6) {
      return sendResponse(res, 400, "Mật khẩu mới phải có ít nhất 6 ký tự");
    }

    const account = await taiKhoanService.getTaiKhoanById(idTaiKhoan);
    if (!account) {
      return sendResponse(res, 404, "Không tìm thấy tài khoản");
    }

    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      account.MatKhau
    );
    if (!isPasswordValid) {
      return sendResponse(res, 400, "Mật khẩu hiện tại không đúng");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await taiKhoanService.updateTaiKhoanById(idTaiKhoan, {
      MatKhau: hashedPassword,
    });

    return sendResponse(res, 200, "Cập nhật mật khẩu thành công");
  } catch (error) {
    next(error);
  }
};
