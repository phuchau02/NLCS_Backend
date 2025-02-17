import express from "express";
import {
  createTaiKhoanController,
  getAllTaiKhoanController,
  getTaiKhoanByIdController,
  updateTaiKhoanByIdController,
  deleteTaiKhoanByIdController,
} from "../controllers/taiKhoan.controllers.js";

const taiKhoanRouter = express.Router();

taiKhoanRouter.post("/", createTaiKhoanController);

taiKhoanRouter.get("/", getAllTaiKhoanController);

taiKhoanRouter.get("/:id", getTaiKhoanByIdController);

taiKhoanRouter.put("/:id", updateTaiKhoanByIdController);

taiKhoanRouter.delete("/:id", deleteTaiKhoanByIdController);

export default taiKhoanRouter;
