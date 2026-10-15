const express = require("express");

const router = express.Router();

const leaveController = require("../controllers/leave.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");
const validationMiddleware = require("../middlewares/validation.middleware");

const {
    applyLeaveValidation
} = require("../validations/leave.validation");

router.use(authMiddleware);

router.post(
    "/",
    roleMiddleware("EMPLOYEE"),
    applyLeaveValidation,
    validationMiddleware,
    leaveController.applyLeave
);

router.get(
    "/my",
    roleMiddleware("EMPLOYEE"),
    leaveController.getMyLeaves
);

router.get(
    "/",
    roleMiddleware("ADMIN"),
    leaveController.getAllLeaves
);

router.put(
    "/:id/approve",
    roleMiddleware("ADMIN"),
    leaveController.approveLeave
);

router.put(
    "/:id/reject",
    roleMiddleware("ADMIN"),
    leaveController.rejectLeave
);

module.exports = router;