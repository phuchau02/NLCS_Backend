import { prisma } from "../prisma/prismaClient.js";

// Tạo món ăn mới
export const createMonAn = async (monAnData) => {
  const monAn = await prisma.Mon_An.create({
    data: monAnData,
  });
  return monAn;
};

// Lấy tất cả các món ăn
export const getAllMonAn = async () => {
  try {
    const monAnList = await prisma.Mon_An.findMany();
    return monAnList;
  } catch (error) {
    console.error("Error fetching all MonAn:", error);
    throw error;
  }
};

// Lấy món ăn theo ID
export const getMonAnById = async (idMonAn) => {
  try {
    const monAn = await prisma.Mon_An.findUnique({
      where: {
        idMonAn: idMonAn,
      },
    });
    if (!monAn) {
      throw new Error(`MonAn with id ${idMonAn} not found`);
    }
    return monAn;
  } catch (error) {
    console.error(`Error fetching MonAn with id ${idMonAn}:`, error);
    throw error;
  }
};

// Xóa món ăn theo ID
export const deleteMonAnById = async (idMonAn) => {
  try {
    const deletedMonAn = await prisma.Mon_An.delete({
      where: {
        idMonAn: idMonAn,
      },
    });
    return deletedMonAn;
  } catch (error) {
    console.error("Error deleting MonAn by ID:", error);
    throw error;
  }
};

// Cập nhật món ăn theo ID
export const updateMonAnById = async (idMonAn, updateData) => {
  try {
    const updatedMonAn = await prisma.Mon_An.update({
      where: {
        idMonAn: idMonAn,
      },
      data: updateData,
    });
    return updatedMonAn;
  } catch (error) {
    console.error("Error updating MonAn by ID:", error);
    throw error;
  }
};
