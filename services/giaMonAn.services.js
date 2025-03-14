import { prisma } from "../prisma/prismaClient.js";

export const createGiaMonAn = async (giaMonAnData) => {
  const giaMonAn = await prisma.gia_Mon_An.create({
    data: giaMonAnData,
  });
  return giaMonAn;
};

export const getAllGiaMonAn = async () => {
  try {
    const giaMonAnList = await prisma.gia_Mon_An.findMany();
    return giaMonAnList;
  } catch (error) {
    console.error("Error fetching all GiaMonAn:", error);
    throw error;
  }
};

export const getGiaMonAnById = async (idGiaMonAn) => {
  try {
    const giaMonAn = await prisma.gia_Mon_An.findUnique({
      where: {
        idGiaMonAn: idGiaMonAn,
      },
    });
    if (!giaMonAn) {
      throw new Error(`GiaMonAn with id ${idGiaMonAn} not found`);
    }
    return giaMonAn;
  } catch (error) {
    console.error(`Error fetching GiaMonAn with id ${idGiaMonAn}:`, error);
    throw error;
  }
};

export const deleteGiaMonAnById = async (idGiaMonAn) => {
  try {
    const deletedGiaMonAn = await prisma.gia_Mon_An.delete({
      where: {
        idGiaMonAn: idGiaMonAn,
      },
    });
    return deletedGiaMonAn;
  } catch (error) {
    console.error("Error deleting GiaMonAn by ID:", error);
    throw error;
  }
};

export const updateGiaMonAnById = async (idGiaMonAn, updateData) => {
  try {
    const updatedGiaMonAn = await prisma.gia_Mon_An.update({
      where: {
        idGiaMonAn: idGiaMonAn,
      },
      data: updateData,
    });
    return updatedGiaMonAn;
  } catch (error) {
    console.error("Error updating GiaMonAn by ID:", error);
    throw error;
  }
};
