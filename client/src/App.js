// src/App.js
import React from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation hook
import AppRoutes from './routes'; // Ensure this file exists and properly exports routes
import Header from './components/Header';
import Footer from './components/Footer';
import HelpCenterButton from "./components/HelpCenterButton";
import UserProvider from "./contexts/UserContext"; 


const App = () => {
  const location = useLocation(); // Get the current location

  // Define routes where Header and Footer should not be displayed
  const hideHeaderFooterRoutes = ['/login', '/signup'];
  const shouldHideHeaderFooter = hideHeaderFooterRoutes.includes(location.pathname);

  return (
    <div className="App">
       <UserProvider>
      {!shouldHideHeaderFooter && <Header />}
      <AppRoutes />
      {!shouldHideHeaderFooter && <Footer />}
      {!shouldHideHeaderFooter && <HelpCenterButton />}
      </UserProvider>
    </div>
  );
};

export default App;
