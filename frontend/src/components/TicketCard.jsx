import Button from "./Button";
import StatusBadge from "./StatusBadge";

function TicketCard({
    ticket,
    isAdmin,
    onClose,
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

                    <h2 className="text-lg font-semibold">

                        {ticket.title}

                    </h2>

                    <p className="mt-3 text-slate-600 whitespace-pre-wrap">

                        {ticket.description}

                    </p>

                    <div className="mt-5">

                        <StatusBadge
                            status={ticket.status}
                        />

                    </div>

                </div>

                {
                    isAdmin &&
                    ticket.status === "OPEN" && (

                        <Button
                            variant="danger"
                            onClick={() =>
                                onClose(ticket.id)
                            }
                        >

                            Close

                        </Button>

                    )
                }

            </div>

        </div>

    );

}

export default TicketCard;