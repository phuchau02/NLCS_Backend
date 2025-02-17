import { createMonAn } from "../services/monAn.services.js";
import { getMonAnById } from "../services/monAn.services.js";
import { getAllMonAn } from "../services/monAn.services.js";
import { deleteMonAnById } from "../services/monAn.services.js";
import { updateMonAnById } from "../services/monAn.services.js";

export const createMonAnController = async (req, res) => {
  try {
    const monAnData = req.body;
    const newMonAn = await createMonAn(monAnData);
    res.send({ message: `Tạo món ăn thành công`, data: newMonAn });
  } catch (error) {
    console.error("Error creating MonAn:", error);
    res
      .status(500)
      .send({ message: "Lỗi khi tạo món ăn", error: error.message });
  }
};

export const getAllMonAnController = async (req, res) => {
  try {
    const monAnList = await getAllMonAn();
    res.send({ message: "Lấy danh sách món ăn thành công", data: monAnList });
  } catch (error) {
    console.error("Error fetching all MonAn:", error);
    res
      .status(500)
      .send({ message: "Lỗi khi lấy danh sách món ăn", error: error.message });
  }
};

export const getMonAnByIdController = async (req, res) => {
  try {
    const { id } = req.params; // Lấy ID từ URL params
    const monAn = await getMonAnById(id);
    res.send({ message: "Lấy thông tin món ăn thành công", data: monAn });
  } catch (error) {
    console.error(`Error fetching MonAn with id ${req.params.id}:`, error);
    res
      .status(404)
      .send({ message: "Không tìm thấy món ăn", error: error.message });
  }
};

export const deleteMonAnByIdController = async (req, res) => {
  try {
    const { id } = req.params; // Lấy id từ URL params
    const deletedMonAn = await deleteMonAnById(id);
    res.send({ message: "Xóa món ăn thành công", data: deletedMonAn });
  } catch (error) {
    console.error(`Error deleting MonAn with id ${req.params.id}:`, error);
    if (error.code === "P2025") {
      res.status(404).send({ message: "Không tìm thấy món ăn cần xóa" });
    } else {
      res
        .status(500)
        .send({ message: "Lỗi khi xóa món ăn", error: error.message });
    }
  }
};

export const updateMonAnByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const updatedMonAn = await updateMonAnById(id, updateData);
    res.send({ message: "Cập nhật món ăn thành công", data: updatedMonAn });
  } catch (error) {
    console.error(`Error updating MonAn with id ${req.params.id}:`, error);
    if (error.code === "P2025") {
      res.status(404).send({ message: "Không tìm thấy món ăn để cập nhật" });
    } else {
      res
        .status(500)
        .send({ message: "Lỗi khi cập nhật món ăn", error: error.message });
    }
  }
};
