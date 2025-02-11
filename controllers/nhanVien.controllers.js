import {
  createNhanVien,
  getAllNhanVien,
  getNhanVienById,
  deleteNhanVienById,
  updateNhanVienById,
} from "../services/nhanVien.services.js";

export const create = (req, res) => {
  res.send({ message: "createNhanVien handler" });
};

export const findAll = (req, res) => {
  res.send({ message: "findAllNhanVien handler" });
};

export const findOne = (req, res) => {
  res.send({ message: `findOneNhanVien handler ${req.params.id}` });
};

export const update = (req, res) => {
  res.send({ message: `updateNhanVien handler ${req.params.id}` });
};

export const remove = (req, res) => {
  res.send({ message: `deleteNhanVien handler ${req.params.id}` });
};

export const removeAll = (req, res) => {
  res.send({ message: "deleteAllNhanVien handler" });
};

export const createNhanVienController = async (req, res) => {
  try {
    const nhanVienData = req.body;
    const newNhanVien = await createNhanVien(nhanVienData);

    res.send({ message: "Tạo nhân viên thành công", data: newNhanVien });
  } catch (error) {
    console.error("Error creating NhanVien:", error);
    res
      .status(500)
      .send({ message: "Lỗi khi tạo nhân viên", error: error.message });
  }
};

export const getAllNhanVienController = async (req, res) => {
  try {
    const nhanVienList = await getAllNhanVien();
    res.send({
      message: "Lấy danh sách nhân viên thành công",
      data: nhanVienList,
    });
  } catch (error) {
    console.error("Error fetching all NhanVien:", error);
    res.status(500).send({
      message: "Lỗi khi lấy danh sách nhân viên",
      error: error.message,
    });
  }
};

export const getNhanVienByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const nhanVien = await getNhanVienById(id);

    res.send({ message: "Lấy thông tin nhân viên thành công", data: nhanVien });
  } catch (error) {
    console.error(`Error fetching NhanVien with id ${req.params.id}:`, error);
    res
      .status(404)
      .send({ message: "Không tìm thấy nhân viên", error: error.message });
  }
};

export const deleteNhanVienByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedNhanVien = await deleteNhanVienById(id);

    res.send({ message: "Xóa nhân viên thành công", data: deletedNhanVien });
  } catch (error) {
    console.error(`Error deleting NhanVien with id ${req.params.id}:`, error);

    if (error.code === "P2025") {
      res.status(404).send({ message: "Không tìm thấy nhân viên để xóa" });
    } else {
      res
        .status(500)
        .send({ message: "Lỗi khi xóa nhân viên", error: error.message });
    }
  }
};

export const updateNhanVienByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedNhanVien = await updateNhanVienById(id, updateData);

    res.send({
      message: "Cập nhật nhân viên thành công",
      data: updatedNhanVien,
    });
  } catch (error) {
    console.error(`Error updating NhanVien with id ${req.params.id}:`, error);

    if (error.code === "P2025") {
      res.status(404).send({ message: "Không tìm thấy nhân viên để cập nhật" });
    } else {
      res
        .status(500)
        .send({ message: "Lỗi khi cập nhật nhân viên", error: error.message });
    }
  }
};
