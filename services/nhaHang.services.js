import { prisma } from "../prisma/prismaClient.js";

export const createNhaHang = async (nhaHangData) => {
  const nhaHang = await prisma.Nha_Hang.create({
    data: nhaHangData,
  });
  return nhaHang;
};

export const getAllNhaHang = async () => {
  try {
    const nhaHangList = await prisma.nha_Hang.findMany();
    return nhaHangList;
  } catch (error) {
    console.error("Error fetching all NhaHang:", error);
    throw error;
  }
};

export const getNhaHangById = async (idNhaHang) => {
  try {
    const nhaHang = await prisma.nha_Hang.findUnique({
      where: {
        idNhaHang: idNhaHang,
      },
    });
    if (!nhaHang) {
      throw new Error(`NhaHang with id ${idNhaHang} not found`);
    }
    return nhaHang;
  } catch (error) {
    console.error(`Error fetching NhaHang with id ${idNhaHang}:`, error);
    throw error;
  }
};

export const deleteNhaHangById = async (idNhaHang) => {
  try {
    const deletedNhaHang = await prisma.nha_Hang.delete({
      where: {
        idNhaHang: idNhaHang,
      },
    });
    return deletedNhaHang;
  } catch (error) {
    console.error("Error deleting NhaHang by ID:", error);
    throw error;
  }
};

export const updateNhaHangById = async (idNhaHang, updateData) => {
  try {
    const updatedNhaHang = await prisma.nha_Hang.update({
      where: {
        idNhaHang: idNhaHang,
      },
      data: updateData,
    });
    return updatedNhaHang;
  } catch (error) {
    console.error("Error updating NhaHang by ID:", error);
    throw error;
  }
};
