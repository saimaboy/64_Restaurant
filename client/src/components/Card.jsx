import React from "react";

const Card = ({ item, onOrder }) => {
  return (
    <div className="bg-white p-4 shadow-lg rounded-lg">
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-40 object-cover rounded-t-lg"
      />
      <div className="p-4">
        <h3 className="text-lg font-bold">{item.name}</h3>
        <p className="text-gray-600">{item.description}</p>
        <p className="text-yellow-500 font-bold">${item.price}</p>
        <button
          onClick={() => onOrder(item)}
          className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600"
        >
          Order
        </button>
      </div>
    </div>
  );
};

export default Card;
