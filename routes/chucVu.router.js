import express from "express";
import {
  createChucVuController,
  getAllChucVuController,
  getChucVuByIdController,
  deleteChucVuByIdController,
  updateChucVuByIdController,
} from "../controllers/chucVu.controllers.js";

const chucVuRouter = express.Router();

chucVuRouter.post("/", createChucVuController);

chucVuRouter.get("/", getAllChucVuController);

chucVuRouter.get("/:id", getChucVuByIdController);

chucVuRouter.put("/:id", updateChucVuByIdController);

chucVuRouter.delete("/:id", deleteChucVuByIdController);

//chucVuRouter.delete("/", deleteAllChucVuController);

export default chucVuRouter;
3;
