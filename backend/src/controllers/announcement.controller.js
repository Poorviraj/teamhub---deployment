const announcementService = require("../services/announcement.service");
const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/apiResponse");
const httpStatus = require("../constants/httpStatus");

const getAnnouncements = asyncHandler(async (req, res) => {
    const announcements = await announcementService.getAnnouncements();

    return ApiResponse.success(
        res,
        httpStatus.OK,
        "Announcements fetched successfully.",
        announcements
    );
});

const createAnnouncement = asyncHandler(async (req, res) => {
    const announcement = await announcementService.createAnnouncement(req.body);

    return ApiResponse.success(
        res,
        httpStatus.CREATED,
        "Announcement created successfully.",
        announcement
    );
});

const updateAnnouncement = asyncHandler(async (req, res) => {
    const announcement = await announcementService.updateAnnouncement(
        req.params.id,
        req.body
    );

    return ApiResponse.success(
        res,
        httpStatus.OK,
        "Announcement updated successfully.",
        announcement
    );
});

const deleteAnnouncement = asyncHandler(async (req, res) => {
    await announcementService.deleteAnnouncement(req.params.id);

    return ApiResponse.success(
        res,
        httpStatus.OK,
        "Announcement deleted successfully."
    );
});

module.exports = {
    getAnnouncements,
    createAnnouncement,
    updateAnnouncement,
    deleteAnnouncement,
};