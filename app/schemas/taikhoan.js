import { LoaiTaiKhoan } from "@prisma/client";
import { z } from "zod";

export const Tai_KhoanSchema = z.object({
  TenDangNhap: z.string().min(1, { message: "Username is required" }).optional(),
  MatKhau: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .optional(),
  LoaiTaiKhoan: z.enum(["ADMIN", "NHAN_VIEN"]).optional(),
  HoTen: z.string().optional(),
  DienThoai: z.string().optional(),
  DiaChi: z.string().optional(),
  SoDienThoai: z.string().optional(),
  deleted: z.boolean().optional(),

 
});

export const ChangePasswordSchema = z.object({
  currentPassword: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
  newPassword: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
  rePassword: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});
