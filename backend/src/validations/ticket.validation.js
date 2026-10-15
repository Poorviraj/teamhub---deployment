const { body } = require("express-validator");

const createTicketValidation = [
    body("subject")
        .trim()
        .notEmpty()
        .withMessage("Subject is required.")
        .isLength({ max: 100 })
        .withMessage("Subject cannot exceed 100 characters."),

    body("description")
        .trim()
        .notEmpty()
        .withMessage("Description is required."),
];

module.exports = {
    createTicketValidation,
};