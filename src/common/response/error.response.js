/**
 * @param {string} [message]
 * @param {number} [statusCode]
 * @returns {Error & { statusCode: number }}
 */
export const createError = (message = "Internal Server Error", statusCode = 500) => {
    const error = /** @type {Error & { statusCode: number }} */ (new Error(message));
    error.statusCode = statusCode;
    return error;
};

/**
 * @param {Error & { statusCode?: number, status?: number }} err
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
export const globalErrorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    const statusCode = err.statusCode || err.status || 500;
    const message = err.message || "Internal Server Error";

    res.status(statusCode).json({
        success: false,
        message,
        statusCode,
    });
};