import { useState } from "react";

import Input from "../../components/Input";
import Button from "../../components/Button";

function LeaveForm({ onSubmit }) {
    const [formData, setFormData] = useState({
        startDate: "",
        endDate: "",
        reason: "",
    });

    const handleChange = (e) => {
        setFormData((previous) => ({
            ...previous,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-5"
        >
            <Input
                type="date"
                name="startDate"
                label="Start Date"
                value={formData.startDate}
                onChange={handleChange}
            />

            <Input
                type="date"
                name="endDate"
                label="End Date"
                value={formData.endDate}
                onChange={handleChange}
            />

            <div>

                <label className="block mb-2 font-medium">
                    Reason
                </label>

                <textarea
                    rows={4}
                    name="reason"
                    value={formData.reason}
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
                Apply Leave
            </Button>

        </form>
    );
}

export default LeaveForm;