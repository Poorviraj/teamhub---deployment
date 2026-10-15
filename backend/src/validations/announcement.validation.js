const { body } = require("express-validator");

const createAnnouncementValidation = [
    body("title")
        .trim()
        .notEmpty()
        .withMessage("Title is required.")
        .isLength({ max: 100 })
        .withMessage("Title cannot exceed 100 characters."),

    body("content")
        .trim()
        .notEmpty()
        .withMessage("Content is required.")
];

const updateAnnouncementValidation = [
    body("title")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Title cannot be empty.")
        .isLength({ max: 100 })
        .withMessage("Title cannot exceed 100 characters."),

    body("content")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Content cannot be empty.")
];

module.exports = {
    createAnnouncementValidation,
    updateAnnouncementValidation,
};