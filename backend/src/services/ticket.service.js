const ticketRepository = require("../repositories/ticket.repository");

const createTicket = async (userId, data) => {
    return ticketRepository.create({
        userId,
        subject: data.subject,
        description: data.description,
        status: "OPEN",
    });
};

const getMyTickets = async (userId) => {
    return ticketRepository.findByUserId(userId);
};

const getAllTickets = async () => {
    return ticketRepository.findAll();
};

const closeTicket = async (id) => {
    const ticket = await ticketRepository.findById(id);

    if (!ticket) {
        throw new ApiError(
            httpStatus.NOT_FOUND,
            "Ticket not found."
        );
    }

    return ticketRepository.close(id);
};

module.exports = {
    createTicket,
    getMyTickets,
    getAllTickets,
    closeTicket,
};