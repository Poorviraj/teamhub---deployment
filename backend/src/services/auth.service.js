const bcrypt = require("bcrypt");
const userRepository = require("../repositories/user.repository");
const { generateAccessToken } = require("../config/jwt");

const httpStatus = require("../constants/httpStatus");
const ApiError = require("../utils/apiError");

const login = async (email, password) => {
    const user = await userRepository.findByEmail(email);

    if (!user) {
        throw new ApiError(
            httpStatus.UNAUTHORIZED,
            "Invalid email or password."
        );
    }

    const isPasswordMatched = await bcrypt.compare(
        password,
        user.password
    );

    if (!isPasswordMatched) {
        throw new ApiError(
            httpStatus.UNAUTHORIZED,
            "Invalid email or password."
        );
    }

    const token = generateAccessToken({
        id: user.id,
        role: user.role,
    });

    const { password: _, ...safeUser } = user;

    return {
        token,
        safeUser,
    };
};

const getCurrentUser = async (id) => {
    const user = await userRepository.findById(id);

    if (!user) {
        throw new ApiError(
            httpStatus.UNAUTHORIZED,
            "Unauthorized."
        );
    }

    const { password: _, ...safeUser } = user;

    return safeUser;
};

module.exports = {
    login,
    getCurrentUser,
};