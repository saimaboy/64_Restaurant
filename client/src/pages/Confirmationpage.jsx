import React from "react";

const Confirmationpage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-4xl font-bold text-green-500 mb-4">Delivery Confirmed!</h1>
      <p className="text-lg text-gray-700 text-center">
        Your delivery has been confirmed. Our hotel will contact you shortly.
      </p>
      <a
        href="/"
        className="mt-8 px-6 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
      >
        Back to Home
      </a>
    </div>
  );
};

export default Confirmationpage;
