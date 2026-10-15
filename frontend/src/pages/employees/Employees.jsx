import { useEffect, useState } from "react";
import api from "../../api/api";
import DashboardLayout from "../../layouts/DashboardLayout";
import Loader from "../../components/Loader";
import Table from "../../components/Table";
import Button from "../../components/Button";
import PageHeader from "../../components/PageHeader";
import SearchBox from "../../components/SearchBox";
import Modal from "../../components/Modal";
import EmployeeForm from "./EmployeeForm";

import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Employees() {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const { user } = useAuth();

    const isAdmin = user?.role === "ADMIN";

    useEffect(() => {
        fetchEmployees();
    }, []);

    const createEmployee = async (data) => {
        try {
            const payload = {
                ...data,
                address: data.address || "Not Provided"
            };

            await api.post("/users", payload);
            setShowModal(false);
            fetchEmployees();
        } catch (error) {
            console.error("❌ Full Backend Error:", error.response?.data);
            const backendErrors = error.response?.data?.errors;

            if (Array.isArray(backendErrors)) {
                const formattedErrors = backendErrors
                    .map(err => `• Field "${err.path || err.field}": ${err.msg || err.message}`)
                    .join("\n");
                alert(`Validation Failed:\n${formattedErrors}`);
            } else {
                alert(`Failed to add employee: ${JSON.stringify(error.response?.data?.message || "Unknown Error")}`);
            }
        }
    };

    const updateEmployee = async (data) => {
        try {
            // 1. Structure the flat data payload your backend controller expects
            const payload = {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                phone: data.phone,           // 🟢 Passing the phone number directly
                designation: data.designation,
                address: "Not Provided"      // Satisfies backend validation middleware
            };

            // 2. Call your backend router route over HTTP
            await api.put(`/users/${selectedEmployee.id}`, payload);

            // 3. Clear application modal view state and refresh dashboard list
            setShowModal(false);
            setSelectedEmployee(null);
            fetchEmployees();
        } catch (error) {
            console.error("Error updating employee:", error.response?.data || error.message);
            alert("Failed to update employee. Check backend fields.");
        }
    };



    const deleteEmployee = async (id) => {
        if (!window.confirm("Delete employee?")) return;
        try {
            await api.delete(`/users/${id}`);
            fetchEmployees();
        } catch (error) {
            console.error("Error deleting employee:", error.response?.data);
        }
    };

    const fetchEmployees = async () => {
        try {
            const response = await api.get("/users");
            setEmployees(response.data.data || []);
        } catch (error) {
            console.error("Error fetching employees:", error);
        } finally {
            setLoading(false);
        }
    };

    // 🟢 FIXED: Search matching the database 'name' property directly
    const filteredEmployees = employees.filter((employee) =>
        (employee.name || "")
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    // Helper to format unified database 'name' into form friendly inputs
    const getFormFriendlyData = (employee) => {
        if (!employee) return null;
        const nameParts = (employee.name || "").split(" ");
        return {
            firstName: nameParts[0] || "",
            lastName: nameParts.slice(1).join(" ") || "",
            email: employee.email || "",
            designation: employee.profile?.designation || "",
            phone: employee.profile?.phone || ""
        };
    };

    if (loading) {
        return (
            <DashboardLayout>
                <Loader />
            </DashboardLayout>
        );
    }

    if (!isAdmin) {
        return <Navigate to="/dashboard" replace />;
    }

    return (
        <DashboardLayout>
            <PageHeader
                title="Employees"
                subtitle="Manage all employees."
                buttonText={isAdmin ? "+ Add Employee" : undefined}
                onClick={() => {
                    setSelectedEmployee(null);
                    setShowModal(true);
                }}
            />

            <div className="mb-6">
                <SearchBox
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search employee..."
                />
            </div>

            <Table columns={["Name", "Email", "Designation", "Phone", "Actions"]}>
                {filteredEmployees.map((employee) => (
                    <tr key={employee.id} className="border-t">
                        {/* 🟢 FIXED: Uses single name field */}
                        <td className="px-6 py-4">{employee.name}</td>
                        <td className="px-6 py-4">{employee.email}</td>
                        <td className="px-6 py-4">{employee.profile?.designation || "N/A"}</td>
                        <td className="px-6 py-4">{employee.profile?.phone || "N/A"}</td>
                        <td className="px-6 py-4">

                            {isAdmin && (

                                <div className="flex gap-2">

                                    <Button
                                        variant="secondary"
                                        onClick={() => {
                                            setSelectedEmployee(employee);
                                            setShowModal(true);
                                        }}
                                    >
                                        Edit
                                    </Button>

                                    <Button
                                        variant="danger"
                                        onClick={() =>
                                            deleteEmployee(employee.id)
                                        }
                                    >
                                        Delete
                                    </Button>

                                </div>

                            )}

                        </td>
                    </tr>
                ))}
            </Table>

            <Modal
                isOpen={showModal}
                title={selectedEmployee ? "Edit Employee" : "Add Employee"}
                onClose={() => {
                    setShowModal(false);
                    setSelectedEmployee(null);
                }}
            >
                <EmployeeForm
                    // 🟢 FIXED: Safe mapping so Edit form fields populate correctly
                    initialData={getFormFriendlyData(selectedEmployee)}
                    onSubmit={selectedEmployee ? updateEmployee : createEmployee}
                />
            </Modal>
        </DashboardLayout>
    );
}

export default Employees;
