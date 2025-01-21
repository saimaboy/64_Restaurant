import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Header = ({ cartCount }) => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState(null); // Store user details

  useEffect(() => {
    // Fetch user details when the component mounts
    const fetchUserDetails = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/users/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Pass token in the header
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user details");
        }

        const data = await response.json();
        setUser(data); // Set user data in state
      } catch (error) {
        alert("Session expired, please log in again.");
        localStorage.removeItem("token"); // Clear invalid token
        navigate("/login");
      }
    };

    fetchUserDetails();
  }, [navigate]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token
    alert("You have logged out!");
    navigate("/login");
  };

  if (!user) {
    return null; // Return null or a loader while fetching user data
  }

  return (
    <header className="bg-gradient-to-tr from-black to-neutral-700 text-white py-4">
      <div className="container mx-auto flex justify-between items-center px-6">
        {/* Logo */}
        <a href="/" className="text-2xl font-bold font-cursive">
          ^_^ 64 Restaurant
        </a>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-6 flex-1 justify-center">
          <a href="/" className="hover:text-yellow-500 uppercase">
            Home
          </a>
          <a href="/Menu" className="hover:text-yellow-500 uppercase">
            Menu
          </a>
          <a href="/Reservations" className="hover:text-yellow-500 uppercase">
            Reservations
          </a>
          <a href="/Promo" className="hover:text-yellow-500 uppercase">
            Promo
          </a>
          <a href="/About" className="hover:text-yellow-500 uppercase">
            About
          </a>
          <a href="/Contact" className="hover:text-yellow-500 uppercase">
            Contact
          </a>
        </nav>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center space-x-2 bg-yellow-500 px-4 py-2 rounded-lg hover:bg-yellow-400"
            >
              <img
                src="https://cdn0.iconfinder.com/data/icons/restaurants-and-dining-flat/340/meal_food_client_man_eat_restaurant_dinner_hungry_enjoy-512.png"
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
              <span>{user.name}</span>
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white text-black rounded-lg shadow-lg w-48 z-10">
                <div className="p-4 border-b">
                  <h3 className="font-bold">{user.name}</h3>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Cart Icon */}
          <div
            className="relative cursor-pointer"
            onClick={() => navigate("/Cart")}
          >
            <img
              src="https://cdn0.iconfinder.com/data/icons/restaurant-52/64/Cover-food-plate-restaurant-512.png"
              alt="Cart"
              className="w-14 h-14 rounded-full"
            />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-sm rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-2xl">☰</button>
      </div>
    </header>
  );
};

export default Header;
