// src/routes.js
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Import pages
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Reservations from "./pages/Reservations";
import Promo from "./pages/Promo";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Cart from "./pages/Cart";
import Confirmationpage from "./pages/Confirmationpage";



// Helper to check authentication status
const isAuthenticated = () => {
  return !!localStorage.getItem("authToken"); // Example auth check
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/Menu" element={<Menu />} />
      <Route path="/Promo" element={<Promo />} />
      <Route path="/About" element={<About />} />
      <Route path="/Contact" element={<ContactUs />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Signup" element={<Signup />} />
      <Route path="/Reservations" element={<Reservations />} />

      {/* Cart Route */}
      <Route path="/Cart" element={<Cart />} />
      <Route path="/Confirmationpage" element={<Confirmationpage />} />

     
      


      {/* Catch-all Route */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
