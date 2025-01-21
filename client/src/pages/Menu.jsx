import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch menu items from backend
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/menu');
        if (!response.ok) {
          throw new Error('Failed to fetch menu items');
        }
        const data = await response.json();
        setMenuItems(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  if (loading) return <div>Loading menu items...</div>;
  if (error) return <div>Error: {error}</div>;

  const handleAddToCart = (item) => {
    const queryParams = new URLSearchParams({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1, // Default quantity
    }).toString();
    navigate(`/cart?${queryParams}`);
  };

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
