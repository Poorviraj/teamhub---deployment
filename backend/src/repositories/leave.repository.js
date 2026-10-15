const prisma = require("../config/prisma");

const create = async (data) => {
    return prisma.leaveRequest.create({
        data,
        include: {
            user: {
                include: {
                    profile: true,
                },
            },
        },
    });
};

const findById = async (id) => {
    return prisma.leaveRequest.findUnique({
        where: {
            id,
        },
        include: {
            user: {
                include: {
                    profile: true,
                },
            },
        },
    });
};

const findAll = async () => {
    return prisma.leaveRequest.findMany({
        include: {
            user: {
                include: {
                    profile: true,
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });
};

const findByUserId = async (userId) => {
    return prisma.leaveRequest.findMany({
        where: {
            userId: userId,
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                }
            }
        },
        orderBy: {
            createdAt: "desc",
        },
    });
};


const updateStatus = async (id, status) => {
    return prisma.leaveRequest.update({
        where: {
            id,
        },
        data: {
            status,
        },
        include: {
            user: {
                include: {
                    profile: true,
                },
            },
        },
    });
};

module.exports = {
    create,
    findById,
    findAll,
    findByUserId,
    updateStatus,
};