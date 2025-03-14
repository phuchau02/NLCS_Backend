import { prisma } from "../prisma/prismaClient.js";

export const createChiTietDonHang = async (chiTietDonHangData) => {
  const chiTietDonHang = await prisma.chiTietDonHang.create({
    data: chiTietDonHangData,
  });
  return chiTietDonHang;
};

export const getAllChiTietDonHang = async () => {
  try {
    const chiTietDonHangList = await prisma.chi_Tiet_Don_Hang.findMany();
    return chiTietDonHangList;
  } catch (error) {
    console.error("Error fetching all ChiTietDonHang:", error);
    throw error;
  }
};

export const getChiTietDonHangById = async (idChiTietDonHang) => {
  try {
    const chiTietDonHang = await prisma.chi_Tiet_Don_Hang.findUnique({
      where: {
        idChiTietDonHang: idChiTietDonHang,
      },
    });
    if (!chiTietDonHang) {
      throw new Error(`ChiTietDonHang with id ${idChiTietDonHang} not found`);
    }
    return chiTietDonHang;
  } catch (error) {
    console.error(
      `Error fetching ChiTietDonHang with id ${idChiTietDonHang}:`,
      error
    );
    throw error;
  }
};

export const deleteChiTietDonHangById = async (idChiTietDonHang) => {
  try {
    const deletedChiTietDonHang = await prisma.chi_Tiet_Don_Hang.delete({
      where: {
        idChiTietDonHang: idChiTietDonHang,
      },
    });
    return deletedChiTietDonHang;
  } catch (error) {
    console.error("Error deleting ChiTietDonHang by ID:", error);
    throw error;
  }
};

export const updateChiTietDonHangById = async (
  idChiTietDonHang,
  updateData
) => {
  try {
    const updatedChiTietDonHang = await prisma.chi_Tiet_Don_Hang.update({
      where: {
        idChiTietDonHang: idChiTietDonHang,
      },
      data: updateData,
    });
    return updatedChiTietDonHang;
  } catch (error) {
    console.error("Error updating ChiTietDonHang by ID:", error);
    throw error;
  }
};
