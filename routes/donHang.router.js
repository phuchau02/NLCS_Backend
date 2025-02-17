import express from "express";
import {
  createDonHangController,
  getAllDonHangController,
  getDonHangByIdController,
  updateDonHangByIdController,
  deleteDonHangByIdController,
} from "../controllers/donHang.controllers.js";

const donHangRouter = express.Router();

donHangRouter.post("/", createDonHangController);

donHangRouter.get("/", getAllDonHangController);

donHangRouter.get("/:id", getDonHangByIdController);

donHangRouter.put("/:id", updateDonHangByIdController);

donHangRouter.delete("/:id", deleteDonHangByIdController);

export default donHangRouter;
