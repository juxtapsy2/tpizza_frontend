import React from "react";
import { CRUST_STYLE_VN, PIZZA_PRICES } from "../../constants";

const PizzaCard = ({ pizza, onBuy }) => {
  const defaultPrice = PIZZA_PRICES[`${pizza.defaultSize}-${pizza.defaultCrustStyle}`] || 0;

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
            <span>Cỡ: <strong>{pizza.defaultSize} inch</strong></span>
            <span><strong>Đế {CRUST_STYLE_VN[pizza.defaultCrustStyle]}</strong></span>
          </div>
        </div>
        <button
          onClick={() => onBuy(pizza)}
          className="text-right text-lg font-bold text-white bg-green-950 w-fit self-end rounded-lg py-2 px-4"
        >
          {defaultPrice.toLocaleString()}₫
        </button>
      </div>
    </div>
  );
};

export default PizzaCard;