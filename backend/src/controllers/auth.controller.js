const authService = require("../services/auth.service");
const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/apiResponse");
const httpStatus = require("../constants/httpStatus");

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const result = await authService.login(email, password);

    res.cookie("accessToken", result.token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000,
    });

    return ApiResponse.success(
        res,
        httpStatus.OK,
        "Login successful.",
        result.safeUser // 🛠️ FIX: Changed from result.user to result.safeUser
    );
});


const logout = asyncHandler(async (req, res) => {
    res.clearCookie("accessToken");

    return ApiResponse.success(
        res,
        httpStatus.OK,
        "Logout successful."
    );
});

const me = asyncHandler(async (req, res) => {
    const user = await authService.getCurrentUser(req.user.id);

    return ApiResponse.success(
        res,
        httpStatus.OK,
        "Current user fetched successfully.",
        user
    );
});

module.exports = {
    login,
    logout,
    me,
};