// src/App.js
import React from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation hook
import AppRoutes from './routes'; // Ensure this file exists and properly exports routes




const App = () => {
  const location = useLocation(); // Get the current location



  return (
    <div className="App">
       <UserProvider>
     
      <AppRoutes />
      
      </UserProvider>
    </div>
  );
};

export default App;
