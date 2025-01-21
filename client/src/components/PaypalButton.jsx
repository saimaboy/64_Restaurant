import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PaypalButton = ({ cartItems }) => {
  const [deliveryDetails, setDeliveryDetails] = useState({
    name: "",
    address: "",
    phone: "",
  });
  const [showForm, setShowForm] = useState(false);
  const [usePayPal, setUsePayPal] = useState(false); // To toggle between fake payment and PayPal
  const navigate = useNavigate();

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDeliveryDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleFakePayment = async () => {
    alert(`payment of $${calculateTotal()} completed successfully!`);
    setShowForm(true); // Show the delivery form after fake payment
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/delivery", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          deliveryDetails,
          cartItems,
          totalAmount: calculateTotal(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save delivery and payment details.");
      }

      const data = await response.json();
      alert("Delivery details saved successfully!");
      navigate("/confirmation"); // Redirect to confirmation page
    } catch (error) {
      console.error("Error saving order or payment details:", error.message);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8">
      {!showForm ? (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Your Cart Total</h2>
          <p className="text-lg mb-4">Total Amount: ${calculateTotal()}</p>
          {!usePayPal ? (
            <div className="space-y-4">
              <button
                onClick={handleFakePayment}
                className="px-6 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                Pay Now
              </button>
              <button
                onClick={() => setUsePayPal(true)}
                className="px-6 ml-5 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Pay with PayPal
              </button>
            </div>
          ) : (
            <PayPalScriptProvider
              options={{
                "client-id": "Ae_v1-FbGVrMCk2Sg2okfDDC829hfgG8FKi9TQtqPnX2NUbYodf3XY2sKQVY336FGCpDZyRoQpv8wKJY",
                currency: "USD",
              }}
            >
              <PayPalButtons
                style={{ layout: "vertical" }}
                createOrder={(data, actions) => {
                  const totalValue = calculateTotal();
                  return actions.order.create({
                    purchase_units: [
                      {
                        description: "Your Cart",
                        amount: {
                          currency_code: "USD",
                          value: totalValue,
                        },
                      },
                    ],
                  });
                }}
                onApprove={(data, actions) => {
                  return actions.order.capture().then(() => {
                    alert(`Transaction completed successfully.`);
                    setShowForm(true); // Show the delivery form after payment
                  });
                }}
                onError={(err) => {
                  console.error("PayPal Checkout Error:", err);
                  alert("An error occurred during the transaction.");
                }}
              />
            </PayPalScriptProvider>
          )}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
          <h2 className="text-2xl font-bold mb-4">Add Delivery Details</h2>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={deliveryDetails.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="address">
              Address
            </label>
            <input
              type="text"
              name="address"
              id="address"
              value={deliveryDetails.address}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="phone">
              Phone Number
            </label>
            <input
              type="text"
              name="phone"
              id="phone"
              value={deliveryDetails.phone}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            Submit Details
          </button>
        </form>
      )}
    </div>
  );
};

export default PaypalButton;
