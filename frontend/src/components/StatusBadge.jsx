function StatusBadge({ status }) {
    const statusStyles = {
        PENDING: "bg-yellow-100 text-yellow-800",
        APPROVED: "bg-green-100 text-green-800",
        REJECTED: "bg-red-100 text-red-800",
    };

    return (
        <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                statusStyles[status] || "bg-slate-100 text-slate-700"
            }`}
        >
            {status}
        </span>
    );
}

export default StatusBadge;