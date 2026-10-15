const express = require("express");

const router = express.Router();

const announcementController = require("../controllers/announcement.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");

const validationMiddleware = require("../middlewares/validation.middleware");

const {
    createAnnouncementValidation,
    updateAnnouncementValidation,
} = require("../validations/announcement.validation");

router.use(authMiddleware);

router.get("/", announcementController.getAnnouncements);

router.post(
    "/",
    roleMiddleware("ADMIN"),
    createAnnouncementValidation,
    validationMiddleware,
    announcementController.createAnnouncement
);

router.put(
    "/:id",
    roleMiddleware("ADMIN"),
    updateAnnouncementValidation,
    validationMiddleware,
    announcementController.updateAnnouncement
);

router.delete(
    "/:id",
    roleMiddleware("ADMIN"),
    announcementController.deleteAnnouncement
);

module.exports = router;