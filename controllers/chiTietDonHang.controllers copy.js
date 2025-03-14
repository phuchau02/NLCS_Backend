import { createChiTietDonHang } from "../services/chiTietDonHang.services.js";
import { getChiTietDonHangById } from "../services/chiTietDonHang.services.js";
import { getAllChiTietDonHang } from "../services/chiTietDonHang.services.js";
import { deleteChiTietDonHangById } from "../services/chiTietDonHang.services.js";
import { updateChiTietDonHangById } from "../services/chiTietDonHang.services.js";

export const findAll = (req, res) => {
  res.send({ message: "findAll handler" });
};

export const findOne = (req, res) => {
  res.send({ message: `findOne handler ${req.params.id}` });
};

export const update = (req, res) => {
  res.send({ message: `update handler ${req.params.id}` });
};

export const remove = (req, res) => {
  res.send({ message: `delete handler ${req.params.id}` });
};

export const removeAll = (req, res) => {
  res.send({ message: "deleteAll handler" });
};

export const createChiTietDonHangController = async (req, res) => {
  const chiTietDonHangData = req.body;

  try {
    const newChiTietDonHang = await createChiTietDonHang(chiTietDonHangData);
    res.send({
      message: "Tạo chi tiết đơn hàng thành công",
      data: newChiTietDonHang,
    });
  } catch (error) {
    console.error("Error creating ChiTietDonHang:", error);
    res
      .status(500)
      .send({ message: "Lỗi khi tạo chi tiết đơn hàng", error: error.message });
  }
};

export const getAllChiTietDonHangController = async (req, res) => {
  try {
    const chiTietDonHangList = await getAllChiTietDonHang();
    res.send({
      message: "Lấy danh sách chi tiết đơn hàng thành công",
      data: chiTietDonHangList,
    });
  } catch (error) {
    console.error("Error fetching all ChiTietDonHang:", error);
    res.status(500).send({
      message: "Lỗi khi lấy danh sách chi tiết đơn hàng",
      error: error.message,
    });
  }
};

export const getChiTietDonHangByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const chiTietDonHang = await getChiTietDonHangById(id);

    res.send({
      message: "Lấy thông tin chi tiết đơn hàng thành công",
      data: chiTietDonHang,
    });
  } catch (error) {
    console.error(
      `Error fetching ChiTietDonHang with id ${req.params.id}:`,
      error
    );
    res.status(404).send({
      message: "Không tìm thấy chi tiết đơn hàng",
      error: error.message,
    });
  }
};

export const deleteChiTietDonHangByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedChiTietDonHang = await deleteChiTietDonHangById(id);

    res.send({
      message: "Xóa chi tiết đơn hàng thành công",
      data: deletedChiTietDonHang,
    });
  } catch (error) {
    console.error(
      `Error deleting ChiTietDonHang with id ${req.params.id}:`,
      error
    );

    if (error.code === "P2025") {
      res
        .status(404)
        .send({ message: "Không tìm thấy chi tiết đơn hàng cần xóa" });
    } else {
      res.status(500).send({
        message: "Lỗi khi xóa chi tiết đơn hàng",
        error: error.message,
      });
    }
  }
};

export const updateChiTietDonHangByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedChiTietDonHang = await updateChiTietDonHangById(
      id,
      updateData
    );

    res.send({
      message: "Cập nhật chi tiết đơn hàng thành công",
      data: updatedChiTietDonHang,
    });
  } catch (error) {
    console.error(
      `Error updating ChiTietDonHang with id ${req.params.id}:`,
      error
    );

    if (error.code === "P2025") {
      res
        .status(404)
        .send({ message: "Không tìm thấy chi tiết đơn hàng để cập nhật" });
    } else {
      res.status(500).send({
        message: "Lỗi khi cập nhật chi tiết đơn hàng",
        error: error.message,
      });
    }
  }
};
