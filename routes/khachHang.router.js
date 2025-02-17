import express from "express";
import {
  createKhachHangController,
  getAllKhachHangController,
  getKhachHangByIdController,
  updateKhachHangByIdController,
  deleteKhachHangByIdController,
} from "../controllers/khachHang.controllers.js";

const khachHangRouter = express.Router();

// Create a new customer
khachHangRouter.post("/", createKhachHangController);

// Get all customers
khachHangRouter.get("/", getAllKhachHangController);

// Get a customer by ID
khachHangRouter.get("/:id", getKhachHangByIdController);

// Update a customer by ID
khachHangRouter.put("/:id", updateKhachHangByIdController);

// Delete a customer by ID
khachHangRouter.delete("/:id", deleteKhachHangByIdController);

export default khachHangRouter;
