const { body } = require("express-validator");

const createEmployeeValidation = [
    body("firstName")
        .trim()
        .notEmpty()
        .withMessage("First name is required."),

    body("lastName")
        .trim()
        .notEmpty()
        .withMessage("Last name is required."),

    body("email")
        .trim()
        .isEmail()
        .withMessage("Valid email is required."),

    body("password")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters long."),

    body("phone")
        .trim()
        .notEmpty()
        .withMessage("Phone is required."),

    body("designation")
        .trim()
        .notEmpty()
        .withMessage("Designation is required."),

    body("address")
        .trim()
        .notEmpty()
        .withMessage("Address is required.")
];

const updateEmployeeValidation = [
    body("firstName")
        .optional()
        .trim(),

    body("lastName")
        .optional()
        .trim(),

    body("phone")
        .optional()
        .trim(),

    body("designation")
        .optional()
        .trim(),

    body("address")
        .optional()
        .trim()
];

module.exports = {
    createEmployeeValidation,
    updateEmployeeValidation
};