import { LoaiTaiKhoan } from "@prisma/client";
import { z } from "zod";

export const Nhan_VienSchema = z.object({
  idNhaVien: z.string().optional(),
  HoTenNV: z
    .string()
    .min(1, { message: "Họ tên không được để trống" })
    .max(50, { message: "Họ tên không được quá 50 ký tự" }),
  ChucVu: z.string().min(1, { message: "Chức vụ không được để trống" }),
  DiaChi: z.string().min(1, { message: "Địa chỉ không được để trống" }),
  LoaiTaiKhoan: z.enum(["ADMIN", "NHAN_VIEN", "KHACH_HANG"]).optional(),
  TenTaiKhoan: z.string().optional(),
  SoDienThoai: z.string().regex(/^0\d{9,10}$/),
  idTaiKhoan: z.string().optional(),
});

// Hàm kiểm tra dữ liệu nhân viên
export const validateNhanVien = (data) => Nhan_VienSchema.safeParse(data);
export const parseNhanVien = (data) => Nhan_VienSchema.parse(data);
