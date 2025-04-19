import React from "react";

const PizzaCard = ({ pizza }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition-transform hover:scale-105">
      <img
        src={pizza.coverImage}
        alt={pizza.title}
        className="w-full h-48 object-cover rounded-t-2xl"
      />
      <div className="p-4 flex flex-col justify-between h-[200px]">
        <div>
          <h3 className="text-lg font-semibold text-green-950 mb-1">{pizza.title}</h3>
          <p className="text-sm text-gray-600 line-clamp-2 mb-3">{pizza.description}</p>
          <div className="flex justify-between text-sm text-green-500 mb-2">
            <span>Size: {pizza.size} inch</span>
            <span>{pizza.crustStyle} Crust</span>
          </div>
        </div>
        <div className="text-right text-lg font-bold text-green-700">
          {pizza.price.toLocaleString()}₫
        </div>
      </div>
    </div>
  );
};

export default PizzaCard;
