import { ZodError } from "zod";

export const errorHandler = (err, req, res, next) => {
  // Xử lý lỗi validation từ Zod
  if (err instanceof ZodError) {
    return res.status(400).json({
      status: "error",
      statusCode: 400,
      message: "Validation failed",
      errors: err.errors, // Zod cung cấp mảng `errors` chi tiết
    });
  }

  console.error(err.stack); // Log lỗi để debug

  res.status(err.status || 500).json({
    status: "error",
    message: err.message || "Internal Server Error",
    error: {
      code: err.code || "INTERNAL_ERROR",
      details: err.details || "An unexpected error occurred.",
    },
  });
};
