import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import PromoCard from "../components/PromoCard";

const Home = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [feedback, setFeedback] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch promotions and menu items
  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const promoResponse = await fetch("http://localhost:5000/api/promotions");
        const promoData = await promoResponse.json();
        setPromotions(promoData.slice(0, 3)); // Display only 3 promotions
      } catch (err) {
        console.error("Error fetching promotions:", err);
      }
    };

    const fetchMenuItems = async () => {
      try {
        const menuResponse = await fetch("http://localhost:5000/api/menu");
        const menuData = await menuResponse.json();
        setMenuItems(menuData.slice(0, 3)); // Display only 3 menu items
      } catch (err) {
        console.error("Error fetching menu items:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPromotions();
    fetchMenuItems();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFeedback((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(feedback),
      });

      if (!response.ok) {
        throw new Error("Failed to submit feedback. Please try again later.");
      }

      const result = await response.json();
      alert(result.message);
      setFeedback({ name: "", email: "", message: "" }); // Reset the form
    } catch (error) {
      alert(error.message);
    }
  };

  const addToCart = (item) => {
    alert(`${item.name} added to cart!`);
  };

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  return (
    <div className="bg-gray-50 overflow-x-hidden">
      {/* Hero Section */}
      <section
        className="relative min-h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
        <div className="container mx-auto flex items-center justify-center h-full relative z-10">
          <div className="text-center mt-60 text-white">
            <h1 className="text-5xl font-cursive font-bold mb-4">Welcome to 64</h1>
            <p className="text-lg mb-6">Your favorite place for delicious meals</p>
            <a
              href="#"
              className="px-8 py-3 bg-yellow-500 text-white rounded-full hover:bg-yellow-600"
            >
              Order Now
            </a>
          </div>
        </div>
      </section>

      {/* Promotions Section */}
      <section className="py-16 p-10 bg-gray-50">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-cursive font-bold mb-8">Our Promotions</h2>
          <p className="text-gray-600 mb-8">
            Check out our latest deals and enjoy great savings while indulging in your favorite dishes.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {promotions.map((promo, index) => (
              <PromoCard
                key={index}
                title={promo.title}
                description={promo.description}
                image={promo.image}
                validTill={promo.validTill}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-cursive font-bold mb-8">Our Menu</h2>
          <div className="grid grid-cols-1 pl-10 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {menuItems.map((item) => (
              <Card key={item.id} item={item} onAddToCart={addToCart} />
            ))}
          </div>
        </div>
      </section>

      {/* Feedback Form */}
      <section className="py-16 bg-white">
        <div className="container mx-auto max-w-lg">
          <h2 className="text-3xl font-bold mb-4 text-center">We Value Your Feedback</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={feedback.name}
                onChange={handleInputChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={feedback.email}
                onChange={handleInputChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Your Feedback
              </label>
              <textarea
                id="message"
                name="message"
                value={feedback.message}
                onChange={handleInputChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
                rows="4"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-600"
            >
              Submit
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;
