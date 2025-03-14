import { sendResponse } from "./response";

export const checkRole = (requiredRole) => {
  return (req, res, next) => {
    if (!req.userId || !req.LoaiTaiKhoan || !requiredRole.includes(req.role)) {
      console.log("Role check failed", req.userId, req.role, requiredRole);
      return sendResponse(
        res,
        403,
        "Forbidden - Bạn không có quyền truy cập tài nguyên này"
      );
    }
    next();
  };
};
