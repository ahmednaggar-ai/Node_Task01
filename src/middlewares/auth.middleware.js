import jwt from "jsonwebtoken";
import { env } from "../../config/env.service.js";
import { createError } from "../common/response/error.response.js";

/**
 * JWT auth middleware.
 * Accepts `Authorization: Bearer <token>` or raw `<token>`.
 * Attaches decoded payload to `req.user`.
 */
export const requireAuth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization?.trim();

        if (!authHeader) {
            throw createError("Unauthorized", 401);
        }

        const token = authHeader.startsWith("Bearer ")
            ? authHeader.slice("Bearer ".length).trim()
            : authHeader;

        if (!token) {
            throw createError("Unauthorized", 401);
        }

        if (!env.JWT_SECRET) {
            throw createError("Server misconfigured: JWT_SECRET is missing", 500);
        }

        const decoded = jwt.verify(token, env.JWT_SECRET);
        req.user = decoded;

        next();
    } catch (error) {
        // jwt errors => 401
        if (error?.name === "JsonWebTokenError" || error?.name === "TokenExpiredError") {
            return next(createError("Unauthorized", 401));
        }

        next(error);
    }
};

