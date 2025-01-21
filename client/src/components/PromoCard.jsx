import React from "react";

const PromoCard = ({ title, description, image, validTill }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-105">
      <img src={image} alt={title} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-4">{description}</p>
        <p className="text-sm text-yellow-600 font-bold">{validTill}</p>
      </div>
    </div>
  );
};

export default PromoCard;
