import { useEffect, useState } from "react";

import api from "../../api/api";

import DashboardLayout from "../../layouts/DashboardLayout";

import Loader from "../../components/Loader";
import Modal from "../../components/Modal";
import PageHeader from "../../components/PageHeader";
import AnnouncementCard from "../../components/AnnouncementCard";

import AnnouncementForm from "./AnnouncementForm";

import { useAuth } from "../../context/AuthContext";

function Announcements() {

    const { user } = useAuth();

    const isAdmin = user?.role === "ADMIN";

    const [announcements, setAnnouncements] = useState([]);

    const [loading, setLoading] = useState(true);

    const [showModal, setShowModal] =
        useState(false);

    const [selectedAnnouncement, setSelectedAnnouncement] =
        useState(null);

    useEffect(() => {

        fetchAnnouncements();

    }, []);

    const fetchAnnouncements = async () => {

        try {

            const response =
                await api.get("/announcements");

            setAnnouncements(response.data.data);

        } finally {

            setLoading(false);

        }

    };

    const createAnnouncement = async (data) => {

        await api.post(
            "/announcements",
            data
        );

        setShowModal(false);

        fetchAnnouncements();

    };

    const updateAnnouncement = async (data) => {

        await api.put(
            `/announcements/${selectedAnnouncement.id}`,
            data
        );

        setSelectedAnnouncement(null);

        setShowModal(false);

        fetchAnnouncements();

    };

    const deleteAnnouncement = async (id) => {

        if (!window.confirm("Delete announcement?"))
            return;

        await api.delete(`/announcements/${id}`);

        fetchAnnouncements();

    };

    if (loading) {
        return (
            <DashboardLayout>
                <Loader />
            </DashboardLayout>
        );
    }

    return (

        <DashboardLayout>

            <PageHeader
                title="Announcements"
                subtitle="Company announcements."
                buttonText={
                    isAdmin
                        ? "+ Add Announcement"
                        : undefined
                }
                onClick={() =>
                    setShowModal(true)
                }
            />

            <div className="space-y-5">

                {announcements.map(
                    (announcement) => (

                        <AnnouncementCard
                            key={announcement.id}
                            announcement={announcement}
                            isAdmin={isAdmin}
                            onEdit={(item) => {

                                setSelectedAnnouncement(item);

                                setShowModal(true);

                            }}
                            onDelete={
                                deleteAnnouncement
                            }
                        />

                    )
                )}

            </div>

            <Modal
                isOpen={showModal}
                title={
                    selectedAnnouncement
                        ? "Edit Announcement"
                        : "Add Announcement"
                }
                onClose={() => {

                    setShowModal(false);

                    setSelectedAnnouncement(null);

                }}
            >

                <AnnouncementForm
                    initialData={
                        selectedAnnouncement
                    }
                    onSubmit={
                        selectedAnnouncement
                            ? updateAnnouncement
                            : createAnnouncement
                    }
                />

            </Modal>

        </DashboardLayout>

    );

}

export default Announcements;