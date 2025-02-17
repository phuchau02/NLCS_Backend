import {
  createDonHang,
  getAllDonHang,
  getDonHangById,
  deleteDonHangById,
  updateDonHangById,
} from "../services/donHang.services.js";

export const create = (req, res) => {
  res.send({ message: "createDonHang handler" });
};

export const findAll = (req, res) => {
  res.send({ message: "findAllDonHang handler" });
};

export const findOne = (req, res) => {
  res.send({ message: `findOneDonHang handler ${req.params.id}` });
};

export const update = (req, res) => {
  res.send({ message: `updateDonHang handler ${req.params.id}` });
};

export const remove = (req, res) => {
  res.send({ message: `deleteDonHang handler ${req.params.id}` });
};

export const removeAll = (req, res) => {
  res.send({ message: "deleteAllDonHang handler" });
};

export const createDonHangController = async (req, res) => {
  try {
    const donHangData = req.body;
    const newDonHang = await createDonHang(donHangData);

    res.send({ message: "Tạo đơn hàng thành công", data: newDonHang });
  } catch (error) {
    console.error("Error creating DonHang:", error);
    res
      .status(500)
      .send({ message: "Lỗi khi tạo đơn hàng", error: error.message });
  }
};

export const getAllDonHangController = async (req, res) => {
  try {
    const donHangList = await getAllDonHang();
    res.send({
      message: "Lấy danh sách đơn hàng thành công",
      data: donHangList,
    });
  } catch (error) {
    console.error("Error fetching all DonHang:", error);
    res.status(500).send({
      message: "Lỗi khi lấy danh sách đơn hàng",
      error: error.message,
    });
  }
};

export const getDonHangByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const donHang = await getDonHangById(id);

    res.send({ message: "Lấy thông tin đơn hàng thành công", data: donHang });
  } catch (error) {
    console.error(`Error fetching DonHang with id ${req.params.id}:`, error);
    res
      .status(404)
      .send({ message: "Không tìm thấy đơn hàng", error: error.message });
  }
};

export const deleteDonHangByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedDonHang = await deleteDonHangById(id);

    res.send({ message: "Xóa đơn hàng thành công", data: deletedDonHang });
  } catch (error) {
    console.error(`Error deleting DonHang with id ${req.params.id}:`, error);

    if (error.code === "P2025") {
      res.status(404).send({ message: "Không tìm thấy đơn hàng để xóa" });
    } else {
      res
        .status(500)
        .send({ message: "Lỗi khi xóa đơn hàng", error: error.message });
    }
  }
};

export const updateDonHangByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedDonHang = await updateDonHangById(id, updateData);

    res.send({
      message: "Cập nhật đơn hàng thành công",
      data: updatedDonHang,
    });
  } catch (error) {
    console.error(`Error updating DonHang with id ${req.params.id}:`, error);

    if (error.code === "P2025") {
      res.status(404).send({ message: "Không tìm thấy đơn hàng để cập nhật" });
    } else {
      res
        .status(500)
        .send({ message: "Lỗi khi cập nhật đơn hàng", error: error.message });
    }
  }
};
