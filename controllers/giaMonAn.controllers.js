import { createGiaMonAn } from "../services/giaMonAn.services.js";
import { getGiaMonAnById } from "../services/giaMonAn.services.js";
import { getAllGiaMonAn } from "../services/giaMonAn.services.js";
import { deleteGiaMonAnById } from "../services/giaMonAn.services.js";
import { updateGiaMonAnById } from "../services/giaMonAn.services.js";

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

export const createGiaMonAnController = async (req, res) => {
  const giaMonAnData = req.body;

  try {
    const newGiaMonAn = await createGiaMonAn(giaMonAnData);
    res.send({ message: "Tạo món ăn thành công", data: newGiaMonAn });
  } catch (error) {
    console.error("Error creating GiaMonAn:", error);
    res
      .status(500)
      .send({ message: "Lỗi khi tạo món ăn", error: error.message });
  }
};

export const getAllGiaMonAnController = async (req, res) => {
  try {
    const giaMonAnList = await getAllGiaMonAn();
    res.send({
      message: "Lấy danh sách món ăn thành công",
      data: giaMonAnList,
    });
  } catch (error) {
    console.error("Error fetching all GiaMonAn:", error);
    res
      .status(500)
      .send({ message: "Lỗi khi lấy danh sách món ăn", error: error.message });
  }
};

export const getGiaMonAnByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const giaMonAn = await getGiaMonAnById(id);

    res.send({ message: "Lấy thông tin món ăn thành công", data: giaMonAn });
  } catch (error) {
    console.error(`Error fetching GiaMonAn with id ${req.params.id}:`, error);
    res
      .status(404)
      .send({ message: "Không tìm thấy món ăn", error: error.message });
  }
};

export const deleteGiaMonAnByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedGiaMonAn = await deleteGiaMonAnById(id);

    res.send({ message: "Xóa món ăn thành công", data: deletedGiaMonAn });
  } catch (error) {
    console.error(`Error deleting GiaMonAn with id ${req.params.id}:`, error);

    if (error.code === "P2025") {
      res.status(404).send({ message: "Không tìm thấy món ăn cần xóa" });
    } else {
      res
        .status(500)
        .send({ message: "Lỗi khi xóa món ăn", error: error.message });
    }
  }
};

export const updateGiaMonAnByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedGiaMonAn = await updateGiaMonAnById(id, updateData);

    res.send({ message: "Cập nhật món ăn thành công", data: updatedGiaMonAn });
  } catch (error) {
    console.error(`Error updating GiaMonAn with id ${req.params.id}:`, error);

    if (error.code === "P2025") {
      res.status(404).send({ message: "Không tìm thấy món ăn để cập nhật" });
    } else {
      res
        .status(500)
        .send({ message: "Lỗi khi cập nhật món ăn", error: error.message });
    }
  }
};
