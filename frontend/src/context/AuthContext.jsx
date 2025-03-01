import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";
import { jwtDecode } from "jwt-decode";
import React from "react";
import { toast } from "react-toastify";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                if (decoded.exp * 1000 > Date.now()) {
                    setUser(decoded);
                } else {
                    logout();
                }
            } catch (error) {
                console.error("Invalid token:", error);
                logout();
            }
        }
    }, []);

    const register = async (userData) => {
        try {
            const res = await API.post("/api/auth/signup", userData, { withCredentials: true });
            const token = res.data.token;
            localStorage.setItem("token", token);
            toast.success("Registered successfully!");
            setUser(jwtDecode(token));

            navigate("/");
        } catch (error) {
            console.error("Registration failed:", error.response?.data || error.message);
        }
    };

    const login = async (credentials) => {
        try {
            const res = await API.post("/api/auth/login", credentials, { withCredentials: true });
            const token = res.data.token;

            if (!token) throw new Error("Invalid login response");

            localStorage.setItem("token", token);
            toast.success("Logged in successfully!");

            setUser(jwtDecode(token));
            navigate("/");
        } catch (error) {
            console.error("Login failed:", error.response?.data?.message || error.message);
            toast.error(error.response?.data?.message || "Invalid email or password");
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        toast.success("Logout Successful");
        setUser(null);
        navigate("/login");
    };

    const forgotPassword = async (email) => {
        try {
            const res = await API.post("/api/auth/forgot-password", { email }, {
                withCredentials: true, headers: {
                    "Content-Type": "application/json",
                },
            });
            toast.success("Reset link sent to your email!");
            return res.data;
        } catch (error) {
            console.error("Forgot password error:", error.response?.data || error.message);
            throw error;
        }
    };

    const resetPassword = async (id, token, newPassword) => {
        try {
            const res = await API.post(`/api/auth/reset-password/${id}/${token}`, { password: newPassword }, { withCredentials: true });
            toast.success("Password updated successfully!");
            return res.data;
        } catch (error) {
            console.error("Reset password error:", error.response?.data || error.message);
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{ user, register, login, forgotPassword, resetPassword, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
