import { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";

function TicketForm({ onSubmit }) {
    const [formData, setFormData] = useState({
        subject: "", // 🛠️ FIX: Changed from title to subject to match Prisma
        description: "",
    });

    const handleChange = (event) => {
        setFormData((previous) => ({
            ...previous,
            [event.target.name]: event.target.value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(formData);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-5"
        >
            <Input
                label="Subject" // Changed visual label text
                name="subject"  // 🛠️ FIX: Input name attribute matches the state key
                value={formData.subject}
                onChange={handleChange}
            />

            <div>
                <label className="block mb-2 font-medium">
                    Description
                </label>

                <textarea
                    rows={5}
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="
                        w-full
                        rounded-xl
                        border
                        border-slate-300
                        p-3
                        outline-none
                        focus:ring-2
                        focus:ring-blue-500
                    "
                />
            </div>

            <Button type="submit">
                Raise Ticket
            </Button>
        </form>
    );
}

export default TicketForm;
