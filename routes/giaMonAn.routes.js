import express from "express";
import {
  createGiaMonAnController,
  getAllGiaMonAnController,
  getGiaMonAnByIdController,
  updateGiaMonAnByIdController,
  deleteGiaMonAnByIdController,
} from "../controllers/giaMonAn.controllers.js";

const giaMonAnRouter = express.Router();

giaMonAnRouter.post("/", createGiaMonAnController);

giaMonAnRouter.get("/", getAllGiaMonAnController);

giaMonAnRouter.get("/:id", getGiaMonAnByIdController);

giaMonAnRouter.put("/:id", updateGiaMonAnByIdController);

giaMonAnRouter.delete("/:id", deleteGiaMonAnByIdController);

export default giaMonAnRouter;
