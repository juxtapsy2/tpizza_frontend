import React, { useState } from "react";
import { usePizzas } from "../../contexts/PizzaContext";
import PizzaDetails from "../../components/PizzaDetails/PizzaDetails";
import { PIZZA_PRICES } from "../../constants";

const Menu = () => {
  const { pizzas } = usePizzas();
  const [selectedPizza, setSelectedPizza] = useState(null);

  return (
    <div className="px-4 py-8 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-center text-green-900 mb-8">
        Thực Đơn
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {pizzas.map((pizza) => {
            const defaultPrice = PIZZA_PRICES[`${pizza.defaultSize}-${pizza.defaultCrustStyle}`] || 90000;
            return (
                <div
                    key={pizza._id}
                    className="bg-white shadow-md rounded-2xl overflow-hidden transform transition-all duration-300 hover:scale-[1.025] hover:shadow-xl hover:ring-1 hover:ring-green-300"

                >
                <img
                    src={pizza.coverImage}
                    alt={pizza.name}
                    className="w-full h-48 object-cover"
                />

                <div className="p-4">
                    <h2 className="text-xl font-semibold text-green-800">{pizza.title}</h2>
                    <p className="text-sm text-gray-600 line-clamp-2 my-2">{pizza.description}</p>
                    <p className="text-green-900 font-bold mb-4">Chỉ từ: {defaultPrice.toLocaleString()}đ</p>
                    <div className="flex flex-row justify-between">
                        <div />
                        <button
                            onClick={() => setSelectedPizza(pizza)}
                            className="px-4 py-2 text-base font-semibold text-white bg-green-900 hover:bg-green-700 rounded-full"
                        >
                            Đặt ngay
                        </button>
                    </div>   
                </div>
            </div>
            );
        })}
    </div>

      {/* Modal for Pizza Details */}
      {selectedPizza && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-0"
            onClick={() => setSelectedPizza(null)}
          ></div>

          <div
            className="relative z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <PizzaDetails
              pizza={selectedPizza}
              onClose={() => setSelectedPizza(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;
