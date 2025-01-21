import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Reservations = () => {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    time: "",
    guests: "",
    phone: "",
  });

  const [reservationConfirmed, setReservationConfirmed] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to make a reservation");
      }

      setReservationConfirmed(true);
      setErrorMessage("lll"); // Clear any previous errors
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-cursive font-bold mb-8">Table Reservation</h2>
          {!reservationConfirmed ? (
            <>
              {errorMessage && (
                <p className="text-red-500 mb-4">{errorMessage}</p>
              )}
              <form
                onSubmit={handleSubmit}
                className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg"
              >
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="date"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="time"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Time
                  </label>
                  <input
                    type="time"
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="guests"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Number of Guests
                  </label>
                  <input
                    type="number"
                    id="guests"
                    name="guests"
                    value={formData.guests}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="phone"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                >
                  Reserve Table
                </button>
              </form>
            </>
          ) : (
            <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4">Reservation Confirmed</h3>
              <p className="text-gray-700">
                Thank you, <span className="font-bold">{formData.name}</span>! Your reservation is confirmed for{" "}
                <span className="font-bold">{formData.date}</span> at{" "}
                <span className="font-bold">{formData.time}</span>.
              </p>
              <p className="mt-2 text-gray-700">
                Number of Guests: <span className="font-bold">{formData.guests}</span>
              </p>
              <p className="mt-2 text-gray-700">
                Contact Number: <span className="font-bold">{formData.phone}</span>
              </p>
              <button
                onClick={() => setReservationConfirmed(false)}
                className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
              >
                Make Another Reservation
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Reservations;
