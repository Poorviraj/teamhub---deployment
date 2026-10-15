import { useEffect, useState } from "react";
import api from "../../api/api";
import DashboardLayout from "../../layouts/DashboardLayout";
import Loader from "../../components/Loader";
import Modal from "../../components/Modal";
import PageHeader from "../../components/PageHeader";
import TicketCard from "../../components/TicketCard";
import TicketForm from "./TicketForm";
import { useAuth } from "../../context/AuthContext";

function Tickets() {
    const { user } = useAuth();
    const isAdmin = user?.role === "ADMIN";

    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    // Re-run whenever user context mounts to ensure data aligns with permissions
    useEffect(() => {
        if (user) {
            fetchTickets();
        }
    }, [user]);

    const fetchTickets = async () => {
        try {
            // 🛠️ FIX: Choose endpoint dynamically based on the verified auth context role
            const url = isAdmin ? "/tickets" : "/tickets/my";
            const response = await api.get(url);
            setTickets(response.data.data || []);
        } catch (error) {
            console.error("Failed to fetch tickets:", error);
        } finally {
            setLoading(false);
        }
    };

    const createTicket = async (data) => {
        try {
            await api.post("/tickets", data);
            setShowModal(false);
            fetchTickets();
        } catch (error) {
            console.error("Failed to create ticket:", error);
        }
    };

    const closeTicket = async (id) => {
        try {
            await api.put(`/tickets/${id}/close`);
            fetchTickets();
        } catch (error) {
            console.error("Failed to close ticket:", error);
        }
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
                title="Support Tickets"
                subtitle="Raise and manage support tickets."
                buttonText={!isAdmin ? "+ Raise Ticket" : undefined}
                // 🛠️ FIX: Prevent modal click execution crashes for Admins who have no button
                onClick={!isAdmin ? () => setShowModal(true) : undefined}
            />

            <div className="space-y-5">
                {tickets.map((ticket) => (
                    <TicketCard
                        key={ticket.id}
                        ticket={ticket}
                        isAdmin={isAdmin}
                        onClose={closeTicket}
                    />
                ))}
                {tickets.length === 0 && (
                    <p className="text-center py-8 text-slate-400">
                        No support tickets found.
                    </p>
                )}
            </div>

            <Modal
                isOpen={showModal}
                title="Raise Ticket"
                onClose={() => setShowModal(false)}
            >
                <TicketForm onSubmit={createTicket} />
            </Modal>
        </DashboardLayout>
    );
}

export default Tickets;
