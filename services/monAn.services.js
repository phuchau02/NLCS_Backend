// import { prisma } from "../prisma/prismaClient.js";

// // Tạo món ăn mới
// export const createMonAn = async (monAnData) => {
//   const monAn = await prisma.Mon_An.create({
//     data: monAnData,
//   });
//   return monAn;
// };

// // Lấy tất cả các món ăn
// export const getAllMonAn = async () => {
//   try {
//     const monAnList = await prisma.Mon_An.findMany();
//     return monAnList;
//   } catch (error) {
//     console.error("Error fetching all MonAn:", error);
//     throw error;
//   }
// };

// // Lấy món ăn theo ID
// export const getMonAnById = async (idMonAn) => {
//   try {
//     const monAn = await prisma.Mon_An.findUnique({
//       where: {
//         idMonAn: idMonAn,
//       },
//     });
//     if (!monAn) {
//       throw new Error(`MonAn with id ${idMonAn} not found`);
//     }
//     return monAn;
//   } catch (error) {
//     console.error(`Error fetching MonAn with id ${idMonAn}:`, error);
//     throw error;
//   }
// };

// // Xóa món ăn theo ID
// export const deleteMonAnById = async (idMonAn) => {
//   try {
//     const deletedMonAn = await prisma.Mon_An.delete({
//       where: {
//         idMonAn: idMonAn,
//       },
//     });
//     return deletedMonAn;
//   } catch (error) {
//     console.error("Error deleting MonAn by ID:", error);
//     throw error;
//   }
// };

// // Cập nhật món ăn theo ID
// export const updateMonAnById = async (idMonAn, updateData) => {
//   try {
//     const updatedMonAn = await prisma.Mon_An.update({
//       where: {
//         idMonAn: idMonAn,
//       },
//       data: updateData,
//     });
//     return updatedMonAn;
//   } catch (error) {
//     console.error("Error updating MonAn by ID:", error);
//     throw error;
//   }
// };


import { prisma } from "../prisma/prismaClient.js";
import { ObjectId } from "mongodb";


// Tạo món ăn mới
export const createMonAn = async (monAnData) => {
  try {
    // Kiểm tra idNhaHang có hợp lệ không
    if (!ObjectId.isValid(monAnData.idNhaHang)) {
      throw new Error("idNhaHang không hợp lệ");
    }

    // Tạo món ăn
    const monAn = await prisma.mon_An.create({
      data: {
        ...monAnData,
        idNhaHang: monAnData.idNhaHang, // Đảm bảo idNhaHang đúng ObjectId
      },
    });

    return monAn;
  } catch (error) {
    console.error("Lỗi khi tạo món ăn:", error);
    throw error;
  }
};


export const getAllMonAn = async () => {
  try {
    const monAnList = await prisma.mon_An.findMany({
      where: {
        idNhaHang: { not: undefined }, // Loại bỏ giá trị null
      },
      include: {
        NhaHang: true,
      },
    });

    return monAnList;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách món ăn:", error);
    throw error;
  }
};


// Lấy món ăn theo ID
export const getMonAnById = async (idMonAn) => {
  try {
    if (!ObjectId.isValid(idMonAn)) {
      throw new Error("ID không hợp lệ");
    }

    const monAn = await prisma.mon_An.findUnique({
      where: { idMonAn },
    });

    if (!monAn) {
      throw new Error(`Không tìm thấy món ăn với ID: ${idMonAn}`);
    }
    return monAn;
  } catch (error) {
    console.error(`Lỗi khi lấy món ăn:`, error);
    throw error;
  }
};

export const updateMonAnById = async (idMonAn, updateData) => {
  try {
    // Kiểm tra ID có hợp lệ không
    if (!ObjectId.isValid(idMonAn)) {
      throw new Error("ID không hợp lệ");
    }

    // Cập nhật món ăn
    const updatedMonAn = await prisma.mon_An.update({
      where: { idMonAn },
      data: updateData,
    });

    return updatedMonAn;
  } catch (error) {
    console.error("Lỗi khi cập nhật món ăn:", error);
    throw error;
  }
};
// Xóa món ăn theo ID
export const deleteMonAnById = async (idMonAn) => {
  try {
    if (!ObjectId.isValid(idMonAn)) {
      throw new Error("ID không hợp lệ");
    }

    return await prisma.mon_An.delete({
      where: { idMonAn },
    });
  } catch (error) {
    console.error("Lỗi khi xóa món ăn:", error);
    throw error;
  }
};
