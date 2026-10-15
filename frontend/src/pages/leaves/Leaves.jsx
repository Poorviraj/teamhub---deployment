import { useEffect, useMemo, useState } from "react";
import api from "../../api/api";
import DashboardLayout from "../../layouts/DashboardLayout";
import Loader from "../../components/Loader";
import PageHeader from "../../components/PageHeader";
import SearchBox from "../../components/SearchBox";
import Table from "../../components/Table";
import StatusBadge from "../../components/StatusBadge";
import Modal from "../../components/Modal";
import LeaveForm from "./LeaveForm";
import Button from "../../components/Button";

function Leaves() {
    const [leaves, setLeaves] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [userRole, setUserRole] = useState("EMPLOYEE");

    // Unified initialization to fetch profile first, then matching leaves data
    useEffect(() => {
        const initializeDashboard = async () => {
            try {
                // 1. Fetch authenticated profile data to confirm real role
                const profileResponse = await api.get("/auth/me");
                const currentRole = profileResponse.data.data.role; 
                setUserRole(currentRole);

                // 2. Select route path based on the confirmed user role block
                const url = currentRole === "ADMIN" ? "/leaves" : "/leaves/my";
                const leavesResponse = await api.get(url);
                setLeaves(leavesResponse.data.data || []);
            } catch (error) {
                console.error("Failed to initialize dashboard profiles:", error);
            } finally {
                setLoading(false);
            }
        };

        initializeDashboard();
    }, []);

    // Reusable fetch action used for refresh cycles on mutation events
    const fetchLeaves = async () => {
        try {
            const url = userRole === "ADMIN" ? "/leaves" : "/leaves/my";
            const response = await api.get(url);
            setLeaves(response.data.data || []);
        } catch (error) {
            console.error("Failed to refresh leave records array:", error);
        }
    };

    // Safe filtered list calculation utilizing optional chaining fallbacks
    const filteredLeaves = useMemo(() => {
        return leaves.filter((leave) => {
            const employeeName = leave.user?.name || "My Request";
            return employeeName.toLowerCase().includes(search.toLowerCase());
        });
    }, [leaves, search]);

    // Stat metric aggregates
    const pending = leaves.filter((leave) => leave.status === "PENDING").length;
    const approved = leaves.filter((leave) => leave.status === "APPROVED").length;
    const rejected = leaves.filter((leave) => leave.status === "REJECTED").length;

    // Mutators
    const applyLeave = async (data) => {
        try {
            await api.post("/leaves", data);
            setShowModal(false);
            fetchLeaves();
        } catch (error) {
            console.error("Failed to apply for leave request:", error);
        }
    };

    const approveLeave = async (id) => {
        try {
            await api.put(`/leaves/${id}/approve`);
            fetchLeaves();
        } catch (error) {
            console.error("Failed to approve leave entity:", error);
        }
    };

    const rejectLeave = async (id) => {
        try {
            await api.put(`/leaves/${id}/reject`);
            fetchLeaves();
        } catch (error) {
            console.error("Failed to reject leave entity:", error);
        }
    };

    // Helper method to turn raw dates into scannable values
    const formatDate = (dateString) => {
        if (!dateString) return "";
        return new Date(dateString).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
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
                title="Leave Requests"
                subtitle={userRole === "ADMIN" ? "Manage employee leave requests." : "Track your leave request histories."}
                buttonText={userRole === "EMPLOYEE" ? "+ Apply Leave" : undefined}
                onClick={userRole === "EMPLOYEE" ? () => setShowModal(true) : undefined}
            />

            <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white border rounded-2xl p-6">
                    <p className="text-slate-500">Pending</p>
                    <h2 className="text-4xl font-bold mt-2">{pending}</h2>
                </div>
                <div className="bg-white border rounded-2xl p-6">
                    <p className="text-slate-500">Approved</p>
                    <h2 className="text-4xl font-bold mt-2">{approved}</h2>
                </div>
                <div className="bg-white border rounded-2xl p-6">
                    <p className="text-slate-500">Rejected</p>
                    <h2 className="text-4xl font-bold mt-2">{rejected}</h2>
                </div>
            </div>

            {userRole === "ADMIN" && (
                <div className="mb-6">
                    <SearchBox
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search employee..."
                    />
                </div>
            )}

            <Table
                columns={[
                    "Employee",
                    "From",
                    "To",
                    "Reason",
                    "Status",
                    userRole === "ADMIN" ? "Actions" : "",
                ].filter(Boolean)}
            >
                {filteredLeaves.map((leave) => (
                    <tr key={leave.id} className="border-t">
                        <td className="px-6 py-4 font-medium text-slate-900">
                            {leave.user?.name || "My Request"}
                        </td>
                        <td className="px-6 py-4 text-slate-600">
                            {formatDate(leave.startDate)}
                        </td>
                        <td className="px-6 py-4 text-slate-600">
                            {formatDate(leave.endDate)}
                        </td>
                        <td className="px-6 py-4 text-slate-600 max-w-xs truncate">
                            {leave.reason}
                        </td>
                        <td className="px-6 py-4">
                            <StatusBadge status={leave.status} />
                        </td>
                        {userRole === "ADMIN" && (
                            <td className="px-6 py-4">
                                {leave.status === "PENDING" && (
                                    <div className="flex gap-2">
                                        <Button onClick={() => approveLeave(leave.id)}>
                                            Approve
                                        </Button>
                                        <Button
                                            variant="danger"
                                            onClick={() => rejectLeave(leave.id)}
                                        >
                                            Reject
                                        </Button>
                                    </div>
                                )}
                            </td>
                        )}
                    </tr>
                ))}
                {filteredLeaves.length === 0 && (
                    <tr>
                        <td colSpan={userRole === "ADMIN" ? 6 : 5} className="text-center py-8 text-slate-400">
                            No leave requests found.
                        </td>
                    </tr>
                )}
            </Table>

            <Modal
                isOpen={showModal}
                title="Apply Leave"
                onClose={() => setShowModal(false)}
            >
                <LeaveForm onSubmit={applyLeave} />
            </Modal>
        </DashboardLayout>
    );
}

export default Leaves;
