import React from 'react';
import { useCart } from '../../contexts/CartContext';
import { Trash2, Plus, Minus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    getPizzaById,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    updateItem,
    calculateTotalPrice,
    calculatePrice,
  } = useCart();

  const handleToppingChange = (index, toppingName, add) => {
    const currentToppings = cartItems[index].toppings || [];
    let updatedToppings;
    if (add) {
      updatedToppings = [...currentToppings, toppingName];
    } else {
      updatedToppings = currentToppings.filter((topping) => topping !== toppingName);
    }
    updateItem(index, { toppings: updatedToppings });
  };

  const handleCheckout = () => {
    navigate('/checkout');
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-green-900 mb-6">Giỏ hàng của bạn</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-600 font-semibold">Chưa có pizza trong giỏ hàng 🍕</p>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item, index) => {
            const pizza = getPizzaById(item.id);

            return (
              <div key={`${item.id}-${item.size}-${item.crustStyle}-${index}`} className="flex items-center gap-4 border-b pb-4">
                <img
                  src={item.coverImage}
                  alt={item.title}
                  className="w-24 h-24 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-green-900">{item.title}</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-3 items-center">
                    <div className="flex flex-col">
                      <label className="text-xs text-gray-500 mb-1">Kích cỡ</label>
                      <select
                        value={item.size}
                        onChange={(e) => updateItem(index, { size: parseInt(e.target.value) })}
                        className="border rounded text-green-900 font-semibold px-2 py-1 focus:outline-none focus:ring-1 focus:ring-green-600"
                      >
                        {pizza?.availableSizes.map((s) => (
                          <option key={s} value={s}>
                            {s} inch
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-col">
                      <label className="text-xs text-gray-500 mb-1">Đế bánh</label>
                      <select
                        value={item.crustStyle}
                        onChange={(e) => updateItem(index, { crustStyle: e.target.value })}
                        className="border rounded text-green-900 font-semibold px-2 py-1 focus:outline-none focus:ring-1 focus:ring-green-600"
                      >
                        {pizza?.availableCrusts.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex flex-col">
                      <label className="text-xs text-gray-500 mb-1">Số lượng</label>
                      <div className="flex items-center border rounded px-2 py-1 w-fit gap-2">
                        <button
                          onClick={() => decreaseQuantity(index)}
                          disabled={item.quantity === 1}
                          className="p-1 hover:text-green-700 disabled:text-gray-300 text-green-900"
                        >
                          <Minus size={16} />
                        </button>
                        <input
                          type="text" // Can't use "number" since the webkit issue
                          value={item.quantity}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (/^\d*$/.test(value)) {
                              updateItem(index, {
                                quantity: value === "" ? 1 : Math.max(1, parseInt(value, 10)),
                              });
                            }
                          }}
                          className="w-12 text-center text-green-900 font-semibold border-none focus:outline-none"
                        />
                        <button
                          onClick={() => increaseQuantity(index)}
                          className="p-1 hover:text-green-700 text-green-900"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Toppings Selector */}
                  <div className="mt-2">
                    <p className="text-xs text-gray-500">Topping:</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2">
                      {pizza?.toppings.map((topping) => {
                        const isSelected = item.toppings.includes(topping.name);
                        return (
                          <div key={topping.name} className="flex items-center gap-2">
                            <label className="inline-flex items-center space-x-2 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => handleToppingChange(index, topping.name, !isSelected)}
                                className="peer hidden"
                              />
                              <div className="w-4 h-4 rounded-full border-2 border-green-900 peer-checked:bg-green-900 peer-checked:ring-inset peer-checked:ring-white peer-checked:ring-2 transition-all duration-200"></div>
                              <span className="text-sm text-green-950 font-semibold">{topping.name}</span>
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Price & Remove */}
                <div className="text-right items-end justify-between h-[75px] flex flex-col">
                  <p className="text-green-900 font-bold">
                    {(calculatePrice(item) * item.quantity).toLocaleString()}₫
                  </p>
                  <button
                    onClick={() => removeItem(index)}
                    className="text-red-500 text-sm font-semibold flex items-center gap-1 hover:underline"
                  >
                    <Trash2 size={14} />
                    Xóa
                  </button>
                </div>
              </div>
            );
          })}

          {/* Total */}
          <div className="text-right mt-6">
            <p className="text-xl font-bold text-green-900">
              Tổng cộng: {calculateTotalPrice().toLocaleString()}₫
            </p>
            <button
              onClick={handleCheckout}
              className="mt-4 bg-green-950 text-white font-semibold px-6 py-2 rounded-lg hover:bg-green-800 transition"
            >
              Thanh toán
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;