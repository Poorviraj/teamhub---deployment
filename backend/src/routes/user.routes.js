const express = require("express");

const router = express.Router();

const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");
const validationMiddleware = require("../middlewares/validation.middleware");

const {
    createEmployeeValidation,
    updateEmployeeValidation
} = require("../validations/user.validation");

router.use(authMiddleware);

router.use(roleMiddleware("ADMIN"));

router.get("/", userController.getAllEmployees);

router.get("/:id", userController.getEmployeeById);

router.post(
    "/",
    createEmployeeValidation,
    validationMiddleware,
    userController.createEmployee
);

router.put(
    "/:id",
    updateEmployeeValidation,
    validationMiddleware,
    userController.updateEmployee
);

router.delete("/:id", userController.deleteEmployee);

module.exports = router;