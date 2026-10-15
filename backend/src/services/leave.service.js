const leaveRepository = require("../repositories/leave.repository");

const applyLeave = async (userId, data) => {
    const startDate = new Date(data.startDate);
    const endDate = new Date(data.endDate);

    if (endDate < startDate) {
        throw new ApiError(
            httpStatus.BAD_REQUEST,
            "End date cannot be before start date."
        );
    }

    return leaveRepository.create({
        userId,
        reason: data.reason,
        startDate,
        endDate,
        status: "PENDING",
    });
};

const getMyLeaves = async (userId) => {
    return leaveRepository.findByUserId(userId);
};

const getAllLeaves = async () => {
    return leaveRepository.findAll();
};

const approveLeave = async (id) => {
    return leaveRepository.updateStatus(id, "APPROVED");
};

const rejectLeave = async (id) => {
    return leaveRepository.updateStatus(id, "REJECTED");
};

module.exports = {
    applyLeave,
    getMyLeaves,
    getAllLeaves,
    approveLeave,
    rejectLeave,
};