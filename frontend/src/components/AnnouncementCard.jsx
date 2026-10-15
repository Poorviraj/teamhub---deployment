import Button from "./Button";

function AnnouncementCard({
    announcement,
    isAdmin,
    onEdit,
    onDelete,
}) {
    return (
        <div
            className="
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-6
                shadow-sm
            "
        >
            <div className="flex items-start justify-between">

                <div>

                    <h2 className="text-xl font-semibold text-slate-900">
                        {announcement.title}
                    </h2>

                    <p className="mt-4 whitespace-pre-wrap text-slate-600">
                        {announcement.content}
                    </p>

                </div>

                {isAdmin && (
                    <div className="flex gap-2">

                        <Button
                            variant="secondary"
                            onClick={() => onEdit(announcement)}
                        >
                            Edit
                        </Button>

                        <Button
                            variant="danger"
                            onClick={() =>
                                onDelete(announcement.id)
                            }
                        >
                            Delete
                        </Button>

                    </div>
                )}

            </div>
        </div>
    );
}

export default AnnouncementCard;