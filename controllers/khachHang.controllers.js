import { createKhachHang } from "../services/khachHang.services.js";
import { getKhachHangById } from "../services/khachHang.services.js";
import { getAllKhachHang } from "../services/khachHang.services.js";
import { deleteKhachHangById } from "../services/khachHang.services.js";
import { updateKhachHangById } from "../services/khachHang.services.js";

// Get all customers
export const getAllKhachHangController = async (req, res) => {
  try {
    const khachHangList = await getAllKhachHang();
    res.send({
      message: "Lấy danh sách khách hàng thành công",
      data: khachHangList,
    });
  } catch (error) {
    console.error("Error fetching all KhachHang:", error);
    res.status(500).send({
      message: "Lỗi khi lấy danh sách khách hàng",
      error: error.message,
    });
  }
};

// Get a customer by ID
export const getKhachHangByIdController = async (req, res) => {
  try {
    const { id } = req.params; // Lấy ID từ URL params
    const khachHang = await getKhachHangById(id);

    res.send({
      message: "Lấy thông tin khách hàng thành công",
      data: khachHang,
    });
  } catch (error) {
    console.error(`Error fetching KhachHang with id ${req.params.id}:`, error);
    res
      .status(404)
      .send({ message: "Không tìm thấy khách hàng", error: error.message });
  }
};

// Create a new customer
export const createKhachHangController = async (req, res) => {
  const khachHangData = req.body;

  const newKhachHang = await createKhachHang(khachHangData);

  res.send({ message: "Tạo khách hàng thành công", data: newKhachHang });
};

// Delete a customer by ID
export const deleteKhachHangByIdController = async (req, res) => {
  try {
    const { id } = req.params; // Lấy id từ URL params
    const deletedKhachHang = await deleteKhachHangById(id);

    res.send({ message: "Xóa khách hàng thành công", data: deletedKhachHang });
  } catch (error) {
    console.error(`Error deleting KhachHang with id ${req.params.id}:`, error);

    if (error.code === "P2025") {
      // Prisma error code for "record not found"
      res.status(404).send({ message: "Không tìm thấy khách hàng cần xóa" });
    } else {
      res
        .status(500)
        .send({ message: "Lỗi khi xóa khách hàng", error: error.message });
    }
  }
};

// Update a customer by ID
export const updateKhachHangByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedKhachHang = await updateKhachHangById(id, updateData);

    res.send({
      message: "Cập nhật khách hàng thành công",
      data: updatedKhachHang,
    });
  } catch (error) {
    console.error(`Error updating KhachHang with id ${req.params.id}:`, error);

    if (error.code === "P2025") {
      res
        .status(404)
        .send({ message: "Không tìm thấy khách hàng để cập nhật" });
    } else {
      res
        .status(500)
        .send({ message: "Lỗi khi cập nhật khách hàng", error: error.message });
    }
  }
};
