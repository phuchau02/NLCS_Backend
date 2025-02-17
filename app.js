import express from "express";
import cors from "cors";

import chucVuRouter from "./routes/chucVu.router.js";
import nhanVienRouter from "./routes/nhanVien.router.js";
import donHangRouter from "./routes/donHang.router.js";
import khachHangRouter from "./routes/khachHang.router.js";
import nhaHangRouter from "./routes/nhaHang.routes.js";
import monAnRouter from "./routes/monAn.routes.js";
import giaMonAnRouter from "./routes/giaMonAn.routes.js";
import taiKhoanRouter from "./routes/taiKhoan.routes.js";
import chiTietDonHangRouter from "./routes/chiTietDonHang.router.js";

const app = express();

app.use(cors());
app.use(express.json());

const baseRouter = express.Router();
baseRouter.use("/chuc_vu", chucVuRouter);
baseRouter.use("/nhan_vien", nhanVienRouter);
baseRouter.use("/don_hang", donHangRouter);
baseRouter.use("/khach_hang", khachHangRouter);
baseRouter.use("/nha_hang", nhaHangRouter);
baseRouter.use("/mon_an", monAnRouter);
baseRouter.use("/gia_mon_an", giaMonAnRouter);
baseRouter.use("/tai_khoan", taiKhoanRouter);
baseRouter.use("/chi_tiet_don_hang", chiTietDonHangRouter);
app.use("/api/v1", baseRouter);

export default app;
