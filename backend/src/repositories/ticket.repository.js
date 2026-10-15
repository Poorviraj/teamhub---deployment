const prisma = require("../config/prisma");

const create = async (data) => {
    return prisma.ticket.create({
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
    return prisma.ticket.findUnique({
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

const findByUserId = async (userId) => {
    return prisma.ticket.findMany({
        where: {
            userId,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
};

const findAll = async () => {
    return prisma.ticket.findMany({
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

const close = async (id) => {
    return prisma.ticket.update({
        where: {
            id,
        },
        data: {
            status: "CLOSED",
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
    findByUserId,
    findAll,
    close,
};