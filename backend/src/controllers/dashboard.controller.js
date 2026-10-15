const dashboardService = require("../services/dashboard.service");
const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/apiResponse");
const httpStatus = require("../constants/httpStatus");

const getDashboard = asyncHandler(async (req, res) => {
    const dashboard = await dashboardService.getDashboard(req.user);

    return ApiResponse.success(
        res,
        httpStatus.OK,
        "Dashboard fetched successfully.",
        dashboard
    );
});

module.exports = {
    getDashboard,
};