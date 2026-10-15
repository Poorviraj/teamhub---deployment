const dashboardRepository = require("../repositories/dashboard.repository");

const getDashboard = async (user) => {
    return dashboardRepository.getDashboardStats(user);
};

module.exports = {
    getDashboard,
};