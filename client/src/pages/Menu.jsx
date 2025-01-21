import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';

const Menu = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
    alert(`${product.name} added to cart!`);
  };

  const menuItems = [
    {
      id: 1,
      name: "Delicious Pizza",
      price: 20,
      description: "A delightful blend of flavors and toppings.",
      image: "/images/menu-item.jpg",
      reviews: 120,
      rating: 4,
    },
    // Add more menu items here
  ];

  return (
    <div className="bg-gray-50 overflow-x-hidden">
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-cursive font-bold mb-8">Our Menu</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {menuItems.map((item) => (
              <div
                key={item.id}
                className="p-4 border rounded-lg shadow-md bg-white"
              >
                <img src={item.image} alt={item.name} className="w-full h-40 object-cover rounded" />
                <h3 className="text-lg font-bold mt-2">{item.name}</h3>
                <p>${item.price}</p>
                <button
                  onClick={() => handleAddToCart(item)}
                  className="mt-2 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Menu;