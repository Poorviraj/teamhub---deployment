const prisma = require("../config/prisma");

const findByEmail = async (email) => {
    return prisma.user.findUnique({
        where: {
            email,
        },
        include: {
            profile: true,
        },
    });
};

const findById = async (id) => {
    return prisma.user.findUnique({
        where: {
            id,
        },
        include: {
            profile: true,
        },
    });
};

const create = async (data) => {
    return prisma.user.create({
        data: {
            // 🟢 Combine frontend first/last names into the single schema field
            name: `${data.firstName || ""} ${data.lastName || ""}`.trim(),
            email: data.email,
            password: data.password,
            role: data.role || "EMPLOYEE",
            
            // 🟢 Handle the nested model creation relation properly
            profile: {
                create: {
                    phone: data.phone || "",
                    designation: data.designation || "Employee",
                }
            }
        },
        // Optional: include the profile in the returned object so frontend updates smoothly
        include: {
            profile: true
        }
    });
};


const update = async (id, data) => {
    return prisma.user.update({
        where: { id },
        data: {
            name: `${data.firstName || ""} ${data.lastName || ""}`.trim(),
            email: data.email,
            profile: {
                update: {
                    phone: data.phone,         // 🟢 Maps the frontend string value to Profile table
                    designation: data.designation
                }
            }
        },
        include: { profile: true }
    });
};


const remove = async (id) => {
    return prisma.user.delete({
        where: {
            id,
        },
    });
};

const findAll = async () => {
    return prisma.user.findMany({
        include: {
            profile: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
};

module.exports = {
    findByEmail,
    findById,
    create,
    update,
    remove,
    findAll,
};