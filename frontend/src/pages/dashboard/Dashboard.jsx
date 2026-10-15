import { useEffect, useState } from "react";
import api from "../../api/api";
import DashboardLayout from "../../layouts/DashboardLayout";
import Loader from "../../components/Loader";
import StatCard from "../../components/StatCard";
import {
    Users,
    CalendarDays,
    Bell,
    Ticket,
    CheckCircle,
} from "lucide-react";

function Dashboard() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboard();
    }, []);

    const fetchDashboard = async () => {
        try {
            const response = await api.get("/dashboard");
            setStats(response.data.data);
        } catch (error) {
            console.error("Failed to load dashboard metrics:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <DashboardLayout>
                <Loader />
            </DashboardLayout>
        );
    }

    // 🛠️ DEFENSIVE CHECK: Prevents client crash if the API returns an unexpected empty body
    if (!stats) {
        return (
            <DashboardLayout>
                <div className="text-center py-12 text-slate-400">
                    Failed to load dashboard workspace. Please refresh or try again.
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-6">
                {stats.role === "ADMIN" ? (
                    <>
                        <StatCard
                            title="Employees"
                            value={stats.employees || 0}
                            icon={Users}
                            color="bg-blue-600"
                        />
                        <StatCard
                            title="Pending Leaves"
                            value={stats.pendingLeaves || 0}
                            icon={CalendarDays}
                            color="bg-orange-500"
                        />
                        <StatCard
                            title="Announcements"
                            value={stats.announcements || 0}
                            icon={Bell}
                            color="bg-green-600"
                        />
                        <StatCard
                            title="Open Tickets"
                            value={stats.openTickets || 0}
                            icon={Ticket}
                            color="bg-red-600"
                        />
                    </>
                ) : (
                    <>
                        <StatCard
                            title="My Pending Leaves"
                            value={stats.myPendingLeaves || 0}
                            icon={CalendarDays}
                            color="bg-orange-500"
                        />
                        <StatCard
                            title="My Approved Leaves"
                            value={stats.myApprovedLeaves || 0}
                            icon={CheckCircle}
                            color="bg-green-600"
                        />
                        <StatCard
                            title="My Open Tickets"
                            value={stats.myOpenTickets || 0}
                            icon={Ticket}
                            color="bg-red-600"
                        />
                        <StatCard
                            title="Announcements"
                            value={stats.announcements || 0}
                            icon={Bell}
                            color="bg-blue-600"
                        />
                    </>
                )}
            </div>
        </DashboardLayout>
    );
}

export default Dashboard;
