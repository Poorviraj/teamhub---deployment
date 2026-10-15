import { useState } from "react";

import Input from "../../components/Input";
import Button from "../../components/Button";

function AnnouncementForm({
    initialData,
    onSubmit,
}) {
    const [formData, setFormData] = useState({
        title: initialData?.title || "",
        content: initialData?.content || "",
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
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
            />

            <div>
                <label className="block mb-2 font-medium">
                    Content
                </label>

                <textarea
                    rows={6}
                    name="content"
                    value={formData.content}
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
                Save Announcement
            </Button>
        </form>
    );
}

export default AnnouncementForm;