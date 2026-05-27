import { createError } from "../common/response/error.response.js";

/**
 * Validate request body with a zod schema.
 * @param {import("zod").ZodTypeAny} schema
 */
export const validateBody = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
        const message = result.error.issues[0].message;
        return next(createError(message || "Validation failed", 400));
    }

    req.body = result.data;
    return next();
};

