import { createTaiKhoan } from "../services/taiKhoan.services.js";
import { getTaiKhoanById } from "../services/taiKhoan.services.js";
import { getAllTaiKhoan } from "../services/taiKhoan.services.js";
import { deleteTaiKhoanById } from "../services/taiKhoan.services.js";
import { updateTaiKhoanById } from "../services/taiKhoan.services.js";

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

export const createTaiKhoanController = async (req, res) => {
  const taiKhoanData = req.body;

  try {
    const newTaiKhoan = await createTaiKhoan(taiKhoanData);
    res.send({ message: "Tạo tài khoản thành công", data: newTaiKhoan });
  } catch (error) {
    console.error("Error creating TaiKhoan:", error);
    res
      .status(500)
      .send({ message: "Lỗi khi tạo tài khoản", error: error.message });
  }
};

export const getAllTaiKhoanController = async (req, res) => {
  try {
    const taiKhoanList = await getAllTaiKhoan();
    res.send({
      message: "Lấy danh sách tài khoản thành công",
      data: taiKhoanList,
    });
  } catch (error) {
    console.error("Error fetching all TaiKhoan:", error);
    res.status(500).send({
      message: "Lỗi khi lấy danh sách tài khoản",
      error: error.message,
    });
  }
};

export const getTaiKhoanByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const taiKhoan = await getTaiKhoanById(id);

    res.send({ message: "Lấy thông tin tài khoản thành công", data: taiKhoan });
  } catch (error) {
    console.error(`Error fetching TaiKhoan with id ${req.params.id}:`, error);
    res
      .status(404)
      .send({ message: "Không tìm thấy tài khoản", error: error.message });
  }
};

export const deleteTaiKhoanByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTaiKhoan = await deleteTaiKhoanById(id);

    res.send({ message: "Xóa tài khoản thành công", data: deletedTaiKhoan });
  } catch (error) {
    console.error(`Error deleting TaiKhoan with id ${req.params.id}:`, error);

    if (error.code === "P2025") {
      res.status(404).send({ message: "Không tìm thấy tài khoản cần xóa" });
    } else {
      res
        .status(500)
        .send({ message: "Lỗi khi xóa tài khoản", error: error.message });
    }
  }
};

export const updateTaiKhoanByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedTaiKhoan = await updateTaiKhoanById(id, updateData);

    res.send({
      message: "Cập nhật tài khoản thành công",
      data: updatedTaiKhoan,
    });
  } catch (error) {
    console.error(`Error updating TaiKhoan with id ${req.params.id}:`, error);

    if (error.code === "P2025") {
      res.status(404).send({ message: "Không tìm thấy tài khoản để cập nhật" });
    } else {
      res
        .status(500)
        .send({ message: "Lỗi khi cập nhật tài khoản", error: error.message });
    }
  }
};
