import { Role } from "@prisma/client";

/**
 * @typedef {import("express").Request} Request
 */

/**
 * @typedef {Request & { userId?: string, role?: Role }} AuthenticatedRequest
 */
