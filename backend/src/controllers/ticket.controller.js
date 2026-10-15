const ticketService = require("../services/ticket.service");
const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/apiResponse");
const httpStatus = require("../constants/httpStatus");

const createTicket = asyncHandler(async (req, res) => {
    const ticket = await ticketService.createTicket(req.user.id, req.body);

    return ApiResponse.success(
        res,
        httpStatus.CREATED,
        "Support ticket created successfully.",
        ticket
    );
});

const getMyTickets = asyncHandler(async (req, res) => {
    const tickets = await ticketService.getMyTickets(req.user.id);

    return ApiResponse.success(
        res,
        httpStatus.OK,
        "Tickets fetched successfully.",
        tickets
    );
});

const getAllTickets = asyncHandler(async (req, res) => {
    const tickets = await ticketService.getAllTickets();

    return ApiResponse.success(
        res,
        httpStatus.OK,
        "All tickets fetched successfully.",
        tickets
    );
});

const closeTicket = asyncHandler(async (req, res) => {
    const ticket = await ticketService.closeTicket(req.params.id);

    return ApiResponse.success(
        res,
        httpStatus.OK,
        "Ticket closed successfully.",
        ticket
    );
});

module.exports = {
    createTicket,
    getMyTickets,
    getAllTickets,
    closeTicket,
};