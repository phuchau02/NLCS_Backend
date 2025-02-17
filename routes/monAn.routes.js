import express from "express";
import {
  createMonAnController,
  getAllMonAnController,
  getMonAnByIdController,
  updateMonAnByIdController,
  deleteMonAnByIdController,
} from "../controllers/monAn.controllers.js";

const monAnRouter = express.Router();

// Route để tạo mới món ăn
monAnRouter.post("/", createMonAnController);

// Route để lấy danh sách tất cả món ăn
monAnRouter.get("/", getAllMonAnController);

// Route để lấy thông tin món ăn theo ID
monAnRouter.get("/:id", getMonAnByIdController);

// Route để cập nhật món ăn theo ID
monAnRouter.put("/:id", updateMonAnByIdController);

// Route để xóa món ăn theo ID
monAnRouter.delete("/:id", deleteMonAnByIdController);

export default monAnRouter;
