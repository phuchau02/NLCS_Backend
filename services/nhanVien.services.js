import { prisma } from "../prisma/prismaClient.js";

export const createNhanVien = async (nhanVienData) => {
  try {
    const nhanVien = await prisma.nhan_Vien.create({
      data: {
        HoTenNV: nhanVienData.HoTenNV,
        GioiTinh: nhanVienData.GioiTinh,
        DiaChi: nhanVienData.DiaChi,
        SoDienThoai: nhanVienData.SoDienThoai,
        ChucVu: {
          connect: { idChucVu: nhanVienData.idChucVu },
        },
      },
    });

    if (nhanVienData.idTaiKhoan) {
      await prisma.nhan_Vien.update({
        where: { idNhanVien: nhanVien.idNhanVien },
        data: {
          TaiKhoan: {
            connect: { idTaiKhoan: nhanVienData.idTaiKhoan },
          },
        },
      });
    }

    return nhanVien;
  } catch (error) {
    console.error("Error creating NhanVien:", error);
    throw error;
  }
};

export const getAllNhanVien = async () => {
  try {
    const nhanVienList = await prisma.Nhan_Vien.findMany({
      include: { TaiKhoan: true, ChucVu: true },
    });
    return nhanVienList;
  } catch (error) {
    console.error("Error fetching all NhanVien:", error);
    throw error;
  }
};

export const getNhanVienById = async (idNhanVien) => {
  try {
    const nhanVien = await prisma.Nhan_Vien.findUnique({
      where: {
        idNhanVien: idNhanVien,
      },
    });
    if (!nhanVien) {
      throw new Error(`NhanVien with id ${idNhanVien} not found`);
    }
    return nhanVien;
  } catch (error) {
    console.error(`Error fetching NhanVien with id ${idNhanVien}:`, error);
    throw error;
  }
};

export const deleteAllNhanVien = async () => {
  try {
    const deletedNhanVien = await prisma.Nhan_Vien.deleteMany();
    return deletedNhanVien;
  } catch (error) {
    console.error("Error deleting all NhanVien:", error);
    throw error;
  }
};

export const deleteNhanVienById = async (idNhanVien) => {
  try {
    const deletedNhanVien = await prisma.Nhan_Vien.delete({
      where: {
        idNhanVien: idNhanVien,
      },
    });
    return deletedNhanVien;
  } catch (error) {
    console.error(`Error deleting NhanVien with id ${idNhanVien}:`, error);
    throw error;
  }
};

export const updateNhanVienById = async (idNhanVien, updateData) => {
  try {
    const updatedNhanVien = await prisma.Nhan_Vien.update({
      where: {
        idNhanVien: idNhanVien,
      },
      data: updateData,
    });
    return updatedNhanVien;
  } catch (error) {
    console.error(`Error updating NhanVien with id ${idNhanVien}:`, error);
    throw error;
  }
};
