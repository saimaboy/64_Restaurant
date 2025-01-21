import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PaypalButton from "../components/PaypalButton";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [deliveryDetails, setDeliveryDetails] = useState({
    address: "",
    city: "",
    postalCode: "",
    phone: "",
  });
  const [isCheckout, setIsCheckout] = useState(false);
  const location = useLocation();

  // Add items to the cart from URL query parameters
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const newItem = {
      id: queryParams.get("id"),
      name: queryParams.get("name"),
      price: parseFloat(queryParams.get("price")),
      quantity: parseInt(queryParams.get("quantity"), 10) || 1,
    };

    if (newItem.id) {
      setCartItems((prevItems) => {
        const existingItem = prevItems.find((item) => item.id === newItem.id);
        if (existingItem) {
          return prevItems.map((item) =>
            item.id === newItem.id
              ? { ...item, quantity: item.quantity + newItem.quantity }
              : item
          );
        } else {
          return [...prevItems, newItem];
        }
      });
    }
  }, [location.search]);

  const handleQuantityChange = (id, amount) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(1, item.quantity + amount),
            }
          : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handleDeliveryChange = (e) => {
    const { name, value } = e.target;
    setDeliveryDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleCheckout = async () => {
    try {
      const paymentResponse = await fetch("http://localhost:5000/api/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartItems,
          totalAmount: calculateTotal(),
        }),
      });

      if (!paymentResponse.ok) {
        throw new Error("Failed to save payment details");
      }

      const deliveryResponse = await fetch(
        "http://localhost:5000/api/delivery",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(deliveryDetails),
        }
      );

      if (!deliveryResponse.ok) {
        throw new Error("Failed to save delivery details");
      }

      alert("Order placed successfully!");
      setCartItems([]);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="container p-10 mx-auto py-16">
      <h2 className="text-4xl font-bold mb-8 text-center">Your Cart</h2>
      {cartItems.length > 0 ? (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-white p-4 shadow rounded-lg"
            >
              <div>
                <h3 className="text-lg font-bold">{item.name}</h3>
                <p className="text-gray-600">Price: ${item.price}</p>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleQuantityChange(item.id, -1)}
                  className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(item.id, 1)}
                  className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => handleRemoveItem(item.id)}
                className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="text-right">
            <h3 className="text-2xl font-bold">Total: ${calculateTotal()}</h3>
          </div>

          {isCheckout ? (
            <div className="mt-4">
              <h3 className="text-xl font-bold mb-4">Delivery Details</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={deliveryDetails.address}
                  onChange={handleDeliveryChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={deliveryDetails.city}
                  onChange={handleDeliveryChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <input
                  type="text"
                  name="postalCode"
                  placeholder="Postal Code"
                  value={deliveryDetails.postalCode}
                  onChange={handleDeliveryChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone"
                  value={deliveryDetails.phone}
                  onChange={handleDeliveryChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
            
            </div>
          ) : (
            <div className="text-right place-items-center mt-4">
              <PaypalButton cartItems={cartItems} />
            </div>
          )}
        </div>
      ) : (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
