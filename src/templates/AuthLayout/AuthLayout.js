import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function AuthLayout({ children, redirectTo }) {
    let isAuthenticated = false;
    return isAuthenticated ? children : < Navigate to = { redirectTo }
    />;
}