import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import Users from "./pages/Users";
import Feedback from "./pages/Feedback";
import Chat from "./pages/Chat";
import ContactUs from "./pages/ContactUs";
import Reservations from "./pages/Reservations";
import Menu from "./pages/Menu";
import Delivery from "./pages/Delivery";
import Promotions from "./pages/Promotions";


const AdminPanel = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white">
        <div className="py-4 px-6 text-2xl font-bold border-b border-gray-700">
          Admin Panel
        </div>
        <nav className="mt-4 space-y-2">
          <Link to="/Users" className="block py-2 px-4 hover:bg-gray-700">
            Users
          </Link>
          <Link to="/Feedback" className="block py-2 px-4 hover:bg-gray-700">
            Feedback
          </Link>
          <Link to="/Chat" className="block py-2 px-4 hover:bg-gray-700" >
            Chat
          </Link>
          <Link to="/Contactus" className="block py-2 px-4 hover:bg-gray-700">
            Contact Us
          </Link>
          <Link to="/Reservations" className="block py-2 px-4 hover:bg-gray-700">
            Reservations
          </Link>
          <Link to="/Menu" className="block py-2 px-4 hover:bg-gray-700">
            Menu
          </Link>
          <Link to="/Delivery" className="block py-2 px-4 hover:bg-gray-700">
            Delivery
          </Link>
          <Link to="/Promotions" className="block py-2 px-4 hover:bg-gray-700">
            Promotions
          </Link>
          
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <Routes>
          <Route path="../pages/Users" element={<Users />} />
          <Route path="../pages/Feedback" element={<Feedback />} />
          <Route path="../pages/Chat" element={<Chat />} />
          <Route path="../pages/Contactus" element={<ContactUs />} />
          <Route path="../pages/Reservations" element={<Reservations />} />
          <Route path="../pages/Menu" element={<Menu />} />
          <Route path="../pages/Delivery" element={<Delivery />} />
          <Route path="../pages/Promotions" element={<Promotions />} />
    
        </Routes>
      </div>
    </div>
  );
};

export default AdminPanel;
