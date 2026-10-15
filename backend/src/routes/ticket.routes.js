const express = require("express");

const router = express.Router();

const ticketController = require("../controllers/ticket.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");
const validationMiddleware = require("../middlewares/validation.middleware");

const {
    createTicketValidation,
} = require("../validations/ticket.validation");

router.use(authMiddleware);

router.post(
    "/",
    roleMiddleware("EMPLOYEE"),
    createTicketValidation,
    validationMiddleware,
    ticketController.createTicket
);

router.get(
    "/my",
    roleMiddleware("EMPLOYEE"),
    ticketController.getMyTickets
);

router.get(
    "/",
    roleMiddleware("ADMIN"),
    ticketController.getAllTickets
);

router.put(
    "/:id/close",
    roleMiddleware("ADMIN"),
    ticketController.closeTicket
);

module.exports = router;