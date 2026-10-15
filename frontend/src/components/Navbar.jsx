import { Bell, UserCircle2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";

function Navbar() {
    const { user, logout } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
            window.location.href = "/";
        } catch (error) {
            console.error("Navbar logout execution failed:", error);
        }
    };

    return (
        <header
            className="
                h-20
                bg-white
                border-b
                border-slate-200
                flex
                items-center
                justify-between
                px-8
            "
        >
            <div>
                <h2 className="text-2xl font-bold text-slate-800">
                    Dashboard
                </h2>
                <p className="text-sm text-slate-500">
                    Welcome back
                </p>
            </div>

            <div className="flex items-center gap-6">
                <Bell
                    size={22}
                    className="cursor-pointer text-slate-600 hover:text-slate-800 transition"
                />

                <div className="flex items-center gap-3">
                    <UserCircle2 size={42} className="text-slate-400" />

                    <div>
                        <h4 className="font-semibold text-slate-800">
                            {/* 🛠️ FIX: Use optional chaining and single name model mapping */}
                            {user?.name || "TeamHub User"}
                        </h4>

                        <p className="text-sm text-slate-500 capitalize">
                            {/* 🛠️ FIX: Use optional chaining to prevent reading property of null */}
                            {user?.role?.toLowerCase() || "Profile"}
                        </p>
                    </div>

                    <div className="ml-2 border-l pl-3 border-slate-200">
                        <button
                            onClick={handleLogout}
                            className="text-sm font-medium cursor-pointer text-slate-500 hover:text-red-600 transition"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Navbar;
