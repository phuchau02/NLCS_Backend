export const sendResponse = (res, statusCode, message, data, meta) => {
  if (statusCode === 204) {
    return res.status(204).send();
  }

  return res.status(statusCode).json({
    status: statusCode >= 400 ? "error" : "success",
    statusCode,
    message,
    ...(data && { data }), // Chỉ bao gồm data nếu có
    ...(meta && { meta }), // Chỉ bao gồm meta nếu có
  });
};
