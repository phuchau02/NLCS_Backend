import { Router } from "express";
import {
  login,
  logout,
  signup,
  adminSignup,
  forgotPassword,
  resetPassword,
  checkAuth,
  changePassword,
  adminCreateUser,
  updateAccount,
} from "../controllers/Auth.controller";
import { validate } from "../middlewares/validate";
import { Tai_KhoanSchema, ChangePasswordSchema } from "../schemas/taikhoan";
import { authenticateToken } from "../middlewares/authMiddleware";
import { checkRole } from "../utils/roleCheck";

import { Role } from "@prisma/client";

const router = Router();

// Verify user after each refresh in frontend to keep user logged in
router.get("/check-auth", authenticateToken, checkAuth);

// Tạo một tài khoản nhân viên thư viện

router.post(
  "/admin-signup",
  // authenticateToken,
  // checkRole([Role.ADMIN]),
  validate(Tai_KhoanSchema),
  adminSignup
);

router.post(
  "/admin-create-user",
  // authenticateToken,
  // checkRole([Role.ADMIN]),
  validate(TaiKhoanSchema),
  adminCreateUser
);

router.post(
  "/account",
  // authenticateToken,
  // checkRole([Role.ADMIN]),
  validate(Tai_KhoanSchema.partial()),
  adminSignup
);

// Đổi mật khẩu
router.post(
  "/change-password/:id",
  authenticateToken,
  validate(ChangePasswordSchema.strict()),
  changePassword
);

// Cập nhật thông tin tài khoản
router.post(
  "/update-account",
  authenticateToken,
  validate(Tai_KhoanSchema.partial()),
  updateAccount
);

// Tạo một tài khoản người dùng
router.post("/signup", validate(Tai_KhoanSchema.strict()), signup);

router.post("/logout", authenticateToken, logout);

router.post(
  "/login",
  validate(Tai_KhoanSchema.pick({ TenDangNhap: true, MatKhau: true })),
  login
);

router.post("/forgot-password", forgotPassword);

router.post("/reset-password/:token", resetPassword);

export { router as AuthRouter };
