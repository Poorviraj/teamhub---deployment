const leaveService = require("../services/leave.service");
const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/apiResponse");
const httpStatus = require("../constants/httpStatus");

const applyLeave = asyncHandler(async (req, res) => {
    const leave = await leaveService.applyLeave(req.user.id, req.body);

    return ApiResponse.success(
        res,
        httpStatus.CREATED,
        "Leave request submitted successfully.",
        leave
    );
});

const getMyLeaves = asyncHandler(async (req, res) => {
    const leaves = await leaveService.getMyLeaves(req.user.id);

    return ApiResponse.success(
        res,
        httpStatus.OK,
        "Leave requests fetched successfully.",
        leaves
    );
});

const getAllLeaves = asyncHandler(async (req, res) => {
    const leaves = await leaveService.getAllLeaves();

    return ApiResponse.success(
        res,
        httpStatus.OK,
        "All leave requests fetched successfully.",
        leaves
    );
});

const approveLeave = asyncHandler(async (req, res) => {
    const leave = await leaveService.approveLeave(req.params.id);

    return ApiResponse.success(
        res,
        httpStatus.OK,
        "Leave approved successfully.",
        leave
    );
});

const rejectLeave = asyncHandler(async (req, res) => {
    const leave = await leaveService.rejectLeave(req.params.id);

    return ApiResponse.success(
        res,
        httpStatus.OK,
        "Leave rejected successfully.",
        leave
    );
});

module.exports = {
    applyLeave,
    getMyLeaves,
    getAllLeaves,
    approveLeave,
    rejectLeave,
};