import express from "express";
import {
  createNhanVienController,
  getAllNhanVienController,
  getNhanVienByIdController,
  updateNhanVienByIdController,
  deleteNhanVienByIdController,
} from "../controllers/nhanVien.controllers.js";

const nhanVienRouter = express.Router();

nhanVienRouter.post("/", createNhanVienController);

nhanVienRouter.get("/", getAllNhanVienController);

nhanVienRouter.get("/:id", getNhanVienByIdController);

nhanVienRouter.put("/:id", updateNhanVienByIdController);

nhanVienRouter.delete("/:id", deleteNhanVienByIdController);

export default nhanVienRouter;
