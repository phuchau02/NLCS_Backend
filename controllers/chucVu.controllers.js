import { createManyChucVu } from "../services/chucVu.services.js";
import { getChucVuById } from "../services/chucVu.services.js";
import { getAllChucVu } from "../services/chucVu.services.js";
//import { deleteAllChucVu } from "../services/chucVu.services.js";
import { deleteChucVuById } from "../services/chucVu.services.js";
import { updateChucVuById } from "../services/chucVu.services.js";
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

export const createManyChucVuController = async (req, res) => {
  const chucVuData = req.body;

  const newChucVu = await createManyChucVu(chucVuData);

  res.send({ message: `Tao chuc vu thanh cong`, data: newChucVu });
};

export const getAllChucVuController = async (req, res) => {
  try {
    const chucVuList = await getAllChucVu();
    res.send({ message: "Lấy danh sách chức vụ thành công", data: chucVuList });
  } catch (error) {
    console.error("Error fetching all ChucVu:", error);
    res
      .status(500)
      .send({ message: "Lỗi khi lấy danh sách chức vụ", error: error.message });
  }
};

export const getChucVuByIdController = async (req, res) => {
  try {
    const { id } = req.params; // Lấy ID từ URL params
    const chucVu = await getChucVuById(id);

    res.send({ message: "Lấy thông tin chức vụ thành công", data: chucVu });
  } catch (error) {
    console.error(`Error fetching ChucVu with id ${req.params.id}:`, error);
    res
      .status(404)
      .send({ message: "Không tìm thấy chức vụ", error: error.message });
  }
};

export const deleteChucVuController = async (req, res) => {
  try {
    const { id } = req.params; // Lấy id từ URL params
    const deletedChucVu = await deleteChucVu(id);

    res.send({ message: "Xóa chức vụ thành công", data: deletedChucVu });
  } catch (error) {
    console.error(`Error deleting ChucVu with id ${req.params.id}:`, error);

    if (error.code === "P2025") {
      // Prisma error code for "record not found"
      res.status(404).send({ message: "Không tìm thấy chức vụ cần xóa" });
    } else {
      res
        .status(500)
        .send({ message: "Lỗi khi xóa chức vụ", error: error.message });
    }
  }
};

// export const deleteAllChucVuController = async (req, res) => {
//   try {
//     const result = await deleteAllChucVu();
//     res.send({ message: "Xóa toàn bộ chức vụ thành công", data: result });
//   } catch (error) {
//     console.error("Error deleting all ChucVu:", error);
//     res
//       .status(500)
//       .send({ message: "Lỗi khi xóa toàn bộ chức vụ", error: error.message });
//   }
// };

export const deleteChucVuByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedChucVu = await deleteChucVuById(id);

    res.send({ message: "Xóa chức vụ thành công", data: deletedChucVu });
  } catch (error) {
    console.error(`Error deleting ChucVu with id ${req.params.id}:`, error);

    if (error.code === "P2025") {
      res.status(404).send({ message: "Không tìm thấy chức vụ để xóa" });
    } else {
      res
        .status(500)
        .send({ message: "Lỗi khi xóa chức vụ", error: error.message });
    }
  }
};

export const updateChucVuByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedChucVu = await updateChucVuById(id, updateData);

    res.send({ message: "Cập nhật chức vụ thành công", data: updatedChucVu });
  } catch (error) {
    console.error(`Error updating ChucVu with id ${req.params.id}:`, error);

    if (error.code === "P2025") {
      res.status(404).send({ message: "Không tìm thấy chức vụ để cập nhật" });
    } else {
      res
        .status(500)
        .send({ message: "Lỗi khi cập nhật chức vụ", error: error.message });
    }
  }
};
