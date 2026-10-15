import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../api/api";

import Button from "../../components/Button";
import Card from "../../components/Card";
import Input from "../../components/Input";
import { useAuth } from "../../context/AuthContext";

function Login() {

    const navigate = useNavigate();
    const { refreshUser } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            setLoading(true);

            const response = await api.post(
                "/auth/login",
                formData
            );

            await refreshUser();

            navigate("/dashboard");

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Login failed."
            );

        } finally {

            setLoading(false);

        }
    };

    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center">

            <Card className="w-full max-w-md">

                <div className="mb-8 text-center">

                    <h1 className="text-3xl font-bold">
                        TeamHub
                    </h1>

                    <p className="mt-2 text-gray-500">
                        Employee Management Portal
                    </p>

                </div>

                <form
                    className="space-y-5"
                    onSubmit={handleSubmit}
                >

                    <Input
                        label="Email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter email"
                    />

                    <Input
                        label="Password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter password"
                    />

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={loading}
                    >
                        {
                            loading
                                ? "Logging in..."
                                : "Login"
                        }
                    </Button>

                </form>

            </Card>

        </div>
    );
}

export default Login;