const express = require("express");

const router = express.Router();

const healthRoutes = require("./health.routes");
const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes");
const leaveRoutes = require("./leave.routes");
const announcementRoutes = require("./announcement.routes");
const ticketRoutes = require("./ticket.routes");
const dashboardRoutes = require("./dashboard.routes");

router.use("/health", healthRoutes);
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/leaves", leaveRoutes);
router.use("/announcements", announcementRoutes);
router.use("/tickets", ticketRoutes);
router.use("/dashboard", dashboardRoutes);

module.exports = router;