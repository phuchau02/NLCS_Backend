import express from "express";
import {
  createNhaHangController,
  getAllNhaHangController,
  getNhaHangByIdController,
  updateNhaHangByIdController,
  deleteNhaHangByIdController,
} from "../controllers/nhaHang.controllers.js";

const nhaHangRouter = express.Router();

// Route để tạo mới nhà hàng
nhaHangRouter.post("/", createNhaHangController);

// Route để lấy danh sách tất cả nhà hàng
nhaHangRouter.get("/", getAllNhaHangController);

// Route để lấy thông tin nhà hàng theo ID
nhaHangRouter.get("/:id", getNhaHangByIdController);

// Route để cập nhật thông tin nhà hàng theo ID
nhaHangRouter.put("/:id", updateNhaHangByIdController);

// Route để xóa nhà hàng theo ID
nhaHangRouter.delete("/:id", deleteNhaHangByIdController);

export default nhaHangRouter;
