// src/routes.js
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Import pages
import AdminPanel from "./pages/AdminPanel";




// Helper to check authentication status
const isAuthenticated = () => {
  return !!localStorage.getItem("authToken"); // Example auth check
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<AdminPanel />} />
    

     


      {/* Catch-all Route */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
