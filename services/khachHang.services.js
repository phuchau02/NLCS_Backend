import { prisma } from "../prisma/prismaClient.js";

// Create a new customer
export const createKhachHang = async (khachHangData) => {
  const khachHang = await prisma.Khach_Hang.create({
    data: khachHangData,
  });
  return khachHang;
};

// Get all customers
export const getAllKhachHang = async () => {
  try {
    const khachHangList = await prisma.Khach_Hang.findMany({
      include: { TaiKhoan: true },
    });
    return khachHangList;
  } catch (error) {
    console.error("Error fetching all KhachHang:", error);
    throw error;
  }
};

// Get customer by ID
export const getKhachHangById = async (idKhachHang) => {
  try {
    const khachHang = await prisma.Khach_Hang.findUnique({
      where: {
        idKhachHang: idKhachHang,
      },
      include: { TaiKhoan: true },
    });
    if (!khachHang) {
      throw new Error(`KhachHang with id ${idKhachHang} not found`);
    }
    return khachHang;
  } catch (error) {
    console.error(`Error fetching KhachHang with id ${idKhachHang}:`, error);
    throw error;
  }
};

// Delete customer by ID
export const deleteKhachHangById = async (idKhachHang) => {
  try {
    const deletedKhachHang = await prisma.Khach_Hang.delete({
      where: {
        idKhachHang: idKhachHang,
      },
    });
    return deletedKhachHang;
  } catch (error) {
    console.error("Error deleting KhachHang by ID:", error);
    throw error;
  }
};

// Update customer by ID
export const updateKhachHangById = async (idKhachHang, updateData) => {
  try {
    const updatedKhachHang = await prisma.Khach_Hang.update({
      where: {
        idKhachHang: idKhachHang,
      },
      data: updateData,
    });
    return updatedKhachHang;
  } catch (error) {
    console.error("Error updating KhachHang by ID:", error);
    throw error;
  }
};
