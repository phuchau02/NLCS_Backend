import { prisma } from "../prisma/prismaClient.js";

export const createChucVu = async (chucVuData) => {
  const chucVu = await prisma.chuc_Vu.create({
    data: chucVuData,
  });
  return chucVu;
};


export const getAllChucVu = async () => {
  try {
    const chucVuList = await prisma.chuc_Vu.findMany();
    return chucVuList;
  } catch (error) {
    console.error("Error fetching all ChucVu:", error);
    throw error;
  }
};

export const getChucVuById = async (idChucVu) => {
  try {
    const chucVu = await prisma.chuc_Vu.findUnique({
      where: {
        idChucVu: idChucVu,
      },
    });
    if (!chucVu) {
      throw new Error(`ChucVu with id ${idChucVu} not found`);
    }
    return chucVu;
  } catch (error) {
    console.error(`Error fetching ChucVu with id ${idChucVu}:`, error);
    throw error;
  }
};

// export const deleteAllChucVu = async () => {
//   try {
//     const deletedChucVu = await prisma.chucVu.deleteMany(); // Xóa tất cả các bản ghi
//     return deletedChucVu; // Trả về số lượng bản ghi đã xóa
//   } catch (error) {
//     console.error("Error deleting all ChucVu:", error);
//     throw error;
//   }
// };

export const deleteChucVuById = async (idChucVu) => {
  try {
    const deletedChucVu = await prisma.chuc_Vu.delete({
      where: {
        idChucVu: idChucVu,
      },
    });
    return deletedChucVu;
  } catch (error) {
    console.error("Error deleting ChucVu by ID:", error);
    throw error;
  }
};

export const updateChucVuById = async (idChucVu, updateData) => {
  try {
    const updatedChucVu = await prisma.chuc_Vu.update({
      where: {
        idChucVu: idChucVu,
      },
      data: updateData,
    });
    return updatedChucVu;
  } catch (error) {
    console.error("Error updating ChucVu by ID:", error);
    throw error;
  }
};
