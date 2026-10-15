const bcrypt = require("bcrypt");
const userRepository = require("../repositories/user.repository");

const getAllEmployees = async () => {
    return await userRepository.findAll();
};

const getEmployeeById = async (id) => {
    const employee = await userRepository.findById(id);

    if (!employee || employee.role !== "EMPLOYEE") {
        throw new ApiError(
            httpStatus.NOT_FOUND,
            "Employee not found."
        );
    }

    const { password, ...safeEmployee } = employee;

    return safeEmployee;
};

const createEmployee = async (data) => {
    const existingUser = await userRepository.findByEmail(data.email);

    if (existingUser) {
        throw new ApiError(
            httpStatus.CONFLICT,
            "Email already exists."
        );
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const employee = await userRepository.create({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: hashedPassword,
        role: "EMPLOYEE",

        profile: {
            create: {
                phone: data.phone,
                designation: data.designation,
                address: data.address,
            },
        },
    });

    const { password, ...safeEmployee } = employee;

    return safeEmployee;
};

const updateEmployee = async (id, data) => {
    const employee = await userRepository.update(id, {
        firstName: data.firstName,
        lastName: data.lastName,
    });

    const { password, ...safeEmployee } = employee;

    return safeEmployee;
};

const deleteEmployee = async (id) => {
    await userRepository.remove(id);
};

module.exports = {
    getAllEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee,
};