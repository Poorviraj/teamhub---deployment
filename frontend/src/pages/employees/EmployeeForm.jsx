import { useState } from "react";

import Input from "../../components/Input";
import Button from "../../components/Button";

function EmployeeForm({
    initialData,
    onSubmit,
}) {

    const [formData, setFormData] = useState({
        firstName: initialData?.firstName || "",
        lastName: initialData?.lastName || "",
        email: initialData?.email || "",
        password: "",
        designation:
            initialData?.profile?.designation || "",
        phone:
            initialData?.profile?.phone || "",
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        onSubmit(formData);

    };

    return (

        <form
            onSubmit={handleSubmit}
            className="space-y-4"
        >

            <Input
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
            />

            <Input
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
            />

            <Input
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
            />

            {!initialData && (
                <Input
                    label="Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />
            )}

            <Input
                label="Designation"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
            />

            <Input
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
            />

            <Button type="submit">

                Save Employee

            </Button>

        </form>

    );

}

export default EmployeeForm;