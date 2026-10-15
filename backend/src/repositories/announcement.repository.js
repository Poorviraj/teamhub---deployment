const prisma = require("../config/prisma");

const create = async (data) => {
    return prisma.announcement.create({
        data: {
            ...data,
            description: data.description || "" // 💡 Autofills description if frontend doesn't send it
        },
    });
};


const findAll = async () => {
    return prisma.announcement.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });
};

const findById = async (id) => {
    return prisma.announcement.findUnique({
        where: {
            id,
        },
    });
};

const update = async (id, data) => {
    return prisma.announcement.update({
        where: {
            id,
        },
        data,
    });
};

const remove = async (id) => {
    return prisma.announcement.delete({
        where: {
            id,
        },
    });
};

module.exports = {
    create,
    findAll,
    findById,
    update,
    remove,
};