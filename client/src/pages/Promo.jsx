import React, { useState, useEffect } from "react";
import PromoCard from "../components/PromoCard"; // Adjust the import path as needed

const Promo = () => {
  const [promos, setPromos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch promo data from backend
  useEffect(() => {
    const fetchPromos = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/promotions");
        if (!response.ok) {
          throw new Error("Failed to fetch promotions");
        }
        const data = await response.json();
        setPromos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPromos();
  }, []);

  if (loading) {
    return <div className="text-center mt-8">Loading promotions...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-8">Error: {error}</div>;
  }

  return (
    <div className="bg-gray-50 p-10 min-h-screen">
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-cursive font-bold mb-8">Our Promotions</h2>
          <p className="text-gray-600 mb-8">
            Check out our latest deals and enjoy great savings while indulging in your favorite dishes.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {promos.map((promo, index) => (
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
    </div>
  );
};

export default Promo;
