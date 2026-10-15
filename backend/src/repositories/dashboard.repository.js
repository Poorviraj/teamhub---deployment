const prisma = require("../config/prisma");

const getDashboardStats = async (user) => {
    if (user.role === "ADMIN") {
        const [
            employees,
            pendingLeaves,
            announcements,
            openTickets,
        ] = await Promise.all([
            prisma.user.count({
                where: { role: "EMPLOYEE" },
            }),
            prisma.leaveRequest.count({
                where: { status: "PENDING" },
            }),
            prisma.announcement.count(),
            prisma.ticket.count({
                where: { status: "OPEN" },
            }),
        ]);

        return {
            role: "ADMIN",
            employees,
            pendingLeaves,
            announcements,
            openTickets,
        };
    }

    const [
        myPendingLeaves,
        myApprovedLeaves,
        myOpenTickets,
        announcements,
    ] = await Promise.all([
        prisma.leaveRequest.count({
            where: {
                userId: user.id,
                status: "PENDING",
            },
        }),

        prisma.leaveRequest.count({
            where: {
                userId: user.id,
                status: "APPROVED",
            },
        }),

        prisma.ticket.count({
            where: {
                userId: user.id,
                status: "OPEN",
            },
        }),

        prisma.announcement.count(),
    ]);

    return {
        role: "EMPLOYEE",
        myPendingLeaves,
        myApprovedLeaves,
        myOpenTickets,
        announcements,
    };
};

module.exports = {
    getDashboardStats,
};