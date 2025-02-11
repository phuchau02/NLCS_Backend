import express from "express";
import cors from "cors";

import chucVuRouter from "./routes/chucVu.router.js";
import nhanVienRouter from "./routes/nhanVien.router.js";
const app = express();

app.use(cors());
app.use(express.json());

const baseRouter = express.Router();
baseRouter.use("/chuc_vu", chucVuRouter);
baseRouter.use("/nhan_vien", nhanVienRouter);

app.use("/api/v1", baseRouter);

export default app;
