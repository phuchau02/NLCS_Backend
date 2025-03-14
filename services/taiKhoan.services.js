import { prisma } from "../prisma/prismaClient.js";
import bcrypt from "bcrypt";

export const login = async (TenDangNhap, MatKhau) => {
  const account = await prisma.tai_Khoan.findFirst({
    where: {
      TenDangNhap,
    },
    include: {
      khachHang: true,
      nhanVien: true,
    },
  });
  if (!account) {
    return null;
  }
  const match = await bcrypt.compare(MatKhau, account.MatKhau);
  if (!match) {
    return null;
  }
  return account;
};

export const getTaiKhoanByUserNameOrEmail = async (TenDangNhap) => {
  return prisma.taiKhoan.findFirst({
    where: {
      TenDangNhap,
    },
    include: {
      docGia: true,
      nhanVien: true,
    },
  });
};

export const createTaiKhoan = async (taiKhoanData) => {
  try {
    const taiKhoan = await prisma.tai_Khoan.create({ data: taiKhoanData });

    if (taiKhoan.idKhachHang) {
      await prisma.khach_Hang.update({
        where: { idKhachHang: taiKhoan.idKhachHang },
        data: {
          TaiKhoan: {
            connect: { idTaiKhoan: taiKhoan.idTaiKhoan },
          },
        },
      });
    }

    return taiKhoan;
  } catch (error) {
    console.error("Error creating TaiKhoan:", error);
    throw error;
  }
};

export const getAllTaiKhoan = async () => {
  try {
    const taiKhoanList = await prisma.tai_Khoan.findMany({
      include: { KhachHang: true },
    });
    return taiKhoanList;
  } catch (error) {
    console.error("Error fetching all TaiKhoan:", error);
    throw error;
  }
};

export const getTaiKhoanById = async (idTaiKhoan) => {
  try {
    const taiKhoan = await prisma.tai_Khoan.findUnique({
      where: {
        idTaiKhoan: idTaiKhoan,
      },
    });
    if (!taiKhoan) {
      throw new Error(`TaiKhoan with id ${idTaiKhoan} not found`);
    }
    return taiKhoan;
  } catch (error) {
    console.error(`Error fetching TaiKhoan with id ${idTaiKhoan}:`, error);
    throw error;
  }
};

export const deleteTaiKhoanById = async (idTaiKhoan) => {
  try {
    const deletedTaiKhoan = await prisma.tai_Khoan.delete({
      where: {
        idTaiKhoan: idTaiKhoan,
      },
    });
    return deletedTaiKhoan;
  } catch (error) {
    console.error("Error deleting TaiKhoan by ID:", error);
    throw error;
  }
};

export const updateTaiKhoanById = async (idTaiKhoan, updateData) => {
  try {
    const updatedTaiKhoan = await prisma.tai_Khoan.update({
      where: {
        idTaiKhoan: idTaiKhoan,
      },
      data: updateData,
    });
    return updatedTaiKhoan;
  } catch (error) {
    console.error("Error updating TaiKhoan by ID:", error);
    throw error;
  }
};

// exports.getTaiKhoanByResetToken = async (resetToken) => {
//   return prisma.tai_Khoan.findFirst({
//     where: {
//       resetPasswordToken: resetToken,
//       resetPasswordExpiresAt: {
//         gt: new Date(),
//       },
//     },
//     include: {
//       khachHang: true,
//       nhanVien: true,
//     },
//   });
// };
