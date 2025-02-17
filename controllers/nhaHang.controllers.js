import { createNhaHang } from "../services/nhaHang.services.js";
import { getNhaHangById } from "../services/nhaHang.services.js";
import { getAllNhaHang } from "../services/nhaHang.services.js";
import { deleteNhaHangById } from "../services/nhaHang.services.js";
import { updateNhaHangById } from "../services/nhaHang.services.js";

export const createNhaHangController = async (req, res) => {
  try {
    const nhaHangData = req.body;
    const newNhaHang = await createNhaHang(nhaHangData);
    res.send({ message: "Tạo nhà hàng thành công", data: newNhaHang });
  } catch (error) {
    console.error("Error creating NhaHang:", error);
    res
      .status(500)
      .send({ message: "Lỗi khi tạo nhà hàng", error: error.message });
  }
};

export const getAllNhaHangController = async (req, res) => {
  try {
    const nhaHangList = await getAllNhaHang();
    res.send({
      message: "Lấy danh sách nhà hàng thành công",
      data: nhaHangList,
    });
  } catch (error) {
    console.error("Error fetching all NhaHang:", error);
    res.status(500).send({
      message: "Lỗi khi lấy danh sách nhà hàng",
      error: error.message,
    });
  }
};

export const getNhaHangByIdController = async (req, res) => {
  try {
    const { id } = req.params; // Lấy ID từ URL params
    const nhaHang = await getNhaHangById(id);
    res.send({ message: "Lấy thông tin nhà hàng thành công", data: nhaHang });
  } catch (error) {
    console.error(`Error fetching NhaHang with id ${req.params.id}:`, error);
    res
      .status(404)
      .send({ message: "Không tìm thấy nhà hàng", error: error.message });
  }
};

export const deleteNhaHangByIdController = async (req, res) => {
  try {
    const { id } = req.params; // Lấy ID từ URL params
    const deletedNhaHang = await deleteNhaHangById(id);
    res.send({ message: "Xóa nhà hàng thành công", data: deletedNhaHang });
  } catch (error) {
    console.error(`Error deleting NhaHang with id ${req.params.id}:`, error);
    if (error.code === "P2025") {
      // Prisma error code for "record not found"
      res.status(404).send({ message: "Không tìm thấy nhà hàng cần xóa" });
    } else {
      res
        .status(500)
        .send({ message: "Lỗi khi xóa nhà hàng", error: error.message });
    }
  }
};

export const updateNhaHangByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const updatedNhaHang = await updateNhaHangById(id, updateData);
    res.send({ message: "Cập nhật nhà hàng thành công", data: updatedNhaHang });
  } catch (error) {
    console.error(`Error updating NhaHang with id ${req.params.id}:`, error);
    if (error.code === "P2025") {
      res.status(404).send({ message: "Không tìm thấy nhà hàng để cập nhật" });
    } else {
      res
        .status(500)
        .send({ message: "Lỗi khi cập nhật nhà hàng", error: error.message });
    }
  }
};
