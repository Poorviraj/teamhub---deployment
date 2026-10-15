const announcementRepository = require("../repositories/announcement.repository");

const getAnnouncements = async () => {
    return announcementRepository.findAll();
};

const createAnnouncement = async (data) => {
    return announcementRepository.create({
        title: data.title,
        content: data.content,
    });
};

const updateAnnouncement = async (id, data) => {
    const announcement = await announcementRepository.findById(id);

    if (!announcement) {
        throw new ApiError(
            httpStatus.NOT_FOUND,
            "Announcement not found."
        );
    }

    return announcementRepository.update(id, {
        title: data.title,
        content: data.content,
    });
};

const deleteAnnouncement = async (id) => {
    const announcement = await announcementRepository.findById(id);

    if (!announcement) {
        throw new ApiError(
            httpStatus.NOT_FOUND,
            "Announcement not found."
        );
    }

    await announcementRepository.remove(id);
};

module.exports = {
    getAnnouncements,
    createAnnouncement,
    updateAnnouncement,
    deleteAnnouncement,
};