import express from "express";
import {
  createChiTietDonHangController,
  getAllChiTietDonHangController,
  getChiTietDonHangByIdController,
  updateChiTietDonHangByIdController,
  deleteChiTietDonHangByIdController,
} from "../controllers/chiTietDonHang.controllers.js";

const chiTietDonHangRouter = express.Router();

chiTietDonHangRouter.post("/", createChiTietDonHangController);

chiTietDonHangRouter.get("/", getAllChiTietDonHangController);

chiTietDonHangRouter.get("/:id", getChiTietDonHangByIdController);

chiTietDonHangRouter.put("/:id", updateChiTietDonHangByIdController);

chiTietDonHangRouter.delete("/:id", deleteChiTietDonHangByIdController);

export default chiTietDonHangRouter;
