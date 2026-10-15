const userService = require("../services/user.service");
const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/apiResponse");
const httpStatus = require("../constants/httpStatus");

const getAllEmployees = asyncHandler(async (req, res) => {
    const employees = await userService.getAllEmployees();

    return ApiResponse.success(
        res,
        httpStatus.OK,
        "Employees fetched successfully.",
        employees
    );
});

const getEmployeeById = asyncHandler(async (req, res) => {
    const employee = await userService.getEmployeeById(req.params.id);

    return ApiResponse.success(
        res,
        httpStatus.OK,
        "Employee fetched successfully.",
        employee
    );
});

const createEmployee = asyncHandler(async (req, res) => {
    const employee = await userService.createEmployee(req.body);

    return ApiResponse.success(
        res,
        httpStatus.CREATED,
        "Employee created successfully.",
        employee
    );
});

const updateEmployee = asyncHandler(async (req, res) => {
    const employee = await userService.updateEmployee(
        req.params.id,
        req.body
    );

    return ApiResponse.success(
        res,
        httpStatus.OK,
        "Employee updated successfully.",
        employee
    );
});

const deleteEmployee = asyncHandler(async (req, res) => {
    await userService.deleteEmployee(req.params.id);

    return ApiResponse.success(
        res,
        httpStatus.OK,
        "Employee deleted successfully."
    );
});

module.exports = {
    getAllEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee,
};