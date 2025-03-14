import { sendResponse } from "./../utils/response";
import { ZodSchema } from "zod";

export const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);

  if (result.error?.errors?.[0]?.code === "unrecognized_keys") {
    return sendResponse(res, 400, "Truyền thừa trường không cần thiết");
  }

  if (!result.success) {
    return next(result.error);
  }

  next();
};
