import { z } from "zod";

export const Khach_HangSchema = z.object({
  idKhachHang: z.string().optional(),
  TenKhachHang: z.string().min(1, { message: "Tên không được để trống" }),
  Email: z.string().email({ message: "Email không hợp lệ" }),
  DiaChi: z.string().min(1, { message: "Địa chỉ không được để trống" }),
  DienThoai: z.string().regex(/^0\d{9,10}$/, {
    message: "Số điện thoại phải bắt đầu bằng số 0 và có 10 hoặc 11 chữ số",
  }),
  NgaySinh: z.coerce.date(),
});

// Hàm kiểm tra dữ liệu khách hàng
export const validateKhachHang = (data) => Khach_HangSchema.safeParse(data);
export const parseKhachHang = (data) => Khach_HangSchema.parse(data);
