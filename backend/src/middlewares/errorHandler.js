const httpStatus = require("../constants/httpStatus");
const ApiError = require("../utils/apiError");

module.exports = (err, req, res, next) => {

    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
        });
    }

    console.error("Unexpected Error:", err);

    const response = {
        success: false,
        message: "Internal Server Error",
    };

    if (process.env.NODE_ENV === "development") {
        response.stack = err.stack;
    }

    return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json(response);
};