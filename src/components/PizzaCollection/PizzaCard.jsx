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
          <h3 className="text-xl text-nowrap font-semibold text-green-900 mb-1">{pizza.title}</h3>
          <p className="text-sm text-gray-600 line-clamp-2 mb-3">{pizza.description}</p>
          <div className="flex justify-between text-sm text-green-700 mb-2">
            <span>Size: <strong>{pizza.size} inch</strong></span>
            <span><strong>{pizza.crustStyle} Crust</strong></span>
          </div>
        </div>
        <div className="text-right text-lg font-bold text-white bg-green-950 w-fit self-end rounded-lg py-2 px-4">
          {pizza.price.toLocaleString()}₫
        </div>
      </div>
    </div>
  );
};

export default PizzaCard;
