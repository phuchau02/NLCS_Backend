import { prisma } from "../prisma/prismaClient.js";

export const createDonHang = async (donHangData) => {
  try {
    const donHang = await prisma.Don_Hang.create({
      data: donHangData,
    });
    return donHang;
  } catch (error) {
    console.error("Error creating DonHang:", error);
    throw error;
  }
};

export const getAllDonHang = async () => {
  try {
    const donHangList = await prisma.Don_Hang.findMany({
      include: {
        NhanVien: true, // Bao gồm thông tin nhân viên liên kết
      },
    });
    return donHangList;
  } catch (error) {
    console.error("Error fetching all DonHang:", error);
    throw error;
  }
};

export const getDonHangById = async (idDonHang) => {
  try {
    const donHang = await prisma.Don_Hang.findUnique({
      where: {
        idDonHang: idDonHang,
      },
      include: {
        NhanVien: true, // Bao gồm thông tin nhân viên liên kết
      },
    });
    if (!donHang) {
      throw new Error(`DonHang with id ${idDonHang} not found`);
    }
    return donHang;
  } catch (error) {
    console.error(`Error fetching DonHang with id ${idDonHang}:`, error);
    throw error;
  }
};

export const deleteAllDonHang = async () => {
  try {
    const deletedDonHang = await prisma.Don_Hang.deleteMany();
    return deletedDonHang;
  } catch (error) {
    console.error("Error deleting all DonHang:", error);
    throw error;
  }
};

export const deleteDonHangById = async (idDonHang) => {
  try {
    const deletedDonHang = await prisma.Don_Hang.delete({
      where: {
        idDonHang: idDonHang,
      },
    });
    return deletedDonHang;
  } catch (error) {
    console.error(`Error deleting DonHang with id ${idDonHang}:`, error);
    throw error;
  }
};

export const updateDonHangById = async (idDonHang, updateData) => {
  try {
    const updatedDonHang = await prisma.Don_Hang.update({
      where: {
        idDonHang: idDonHang,
      },
      data: updateData,
    });
    return updatedDonHang;
  } catch (error) {
    console.error(`Error updating DonHang with id ${idDonHang}:`, error);
    throw error;
  }
};
