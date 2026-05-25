export const successResponse = (res, data, message) => {
    res.status(200).json({
        success: true,
        data: data,
        message: message
    });
}