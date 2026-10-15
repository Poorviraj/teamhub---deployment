const ApiResponse = require("../utils/apiResponse");
const httpStatus = require("../constants/httpStatus");

exports.health = (req, res) => {

    return ApiResponse.success(
        res,
        httpStatus.OK,
        "Server is running"
    );

};