import { NavLink } from "react-router-dom";
import {
    LayoutDashboard,
    Users,
    CalendarDays,
    Bell,
    Ticket,
    LogOut,
    Building2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Sidebar() {
    const navigate = useNavigate();

    // 🛠️ FIX: Move custom context hook inside the component function block
    const { user, logout } = useAuth();
    const isAdmin = user?.role === "ADMIN";

    // 🛠️ FIX: Dynamic calculation happens at runtime inside the component body
    const menuItems = isAdmin
        ? [
            { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
            { name: "Employees", icon: Users, path: "/employees" },
            { name: "Leaves", icon: CalendarDays, path: "/leaves" },
            { name: "Announcements", icon: Bell, path: "/announcements" },
            { name: "Tickets", icon: Ticket, path: "/tickets" },
        ]
        : [
            { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
            { name: "Leaves", icon: CalendarDays, path: "/leaves" },
            { name: "Announcements", icon: Bell, path: "/announcements" },
            { name: "Tickets", icon: Ticket, path: "/tickets" },
        ];

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <aside className="w-72 bg-slate-900 text-white flex flex-col">
            <div className="h-20 flex items-center px-8 border-b border-slate-700">
                <Building2 size={34} />
                <div className="ml-4">
                    <h1 className="font-bold text-xl">
                        TeamHub
                    </h1>
                    <p className="text-xs text-slate-400">
                        {/* 🔍 DYNAMIC TEXT: Switches text instantly based on user role */}
                        {isAdmin ? "Admin Portal" : "Employee Portal"}
                    </p>
                </div>
            </div>


            <nav className="flex-1 px-4 py-6 space-y-2">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                                ${isActive ? "bg-blue-600" : "hover:bg-slate-800"}`
                            }
                        >
                            <Icon size={20} />
                            {item.name}
                        </NavLink>
                    );
                })}
            </nav>

            <div className="border-t border-slate-700 p-4">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-600 transition"
                >
                    <LogOut size={20} />
                    Logout
                </button>
            </div>
        </aside>
    );
}

export default Sidebar;
