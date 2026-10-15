const { body } = require("express-validator");

const applyLeaveValidation = [
    body("reason")
        .trim()
        .notEmpty()
        .withMessage("Reason is required."),

    body("startDate")
        .notEmpty()
        .withMessage("Start date is required.")
        .isISO8601()
        .withMessage("Start date must be a valid date."),

    body("endDate")
        .notEmpty()
        .withMessage("End date is required.")
        .isISO8601()
        .withMessage("End date must be a valid date.")
];

const updateLeaveStatusValidation = [
    body().custom(() => true)
];

module.exports = {
    applyLeaveValidation,
    updateLeaveStatusValidation
};