import React from "react";
import { useCart } from "../../contexts/CartContext";
import { CRUST_STYLE_VN } from "../../constants";
import { Trash2, Plus, Minus } from "lucide-react";
import { toast } from "react-toastify";

const Cart = () => {
  const {
    cartItems,
    getPizzaById,
    calculatePrice,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    updateItem,
  } = useCart();

  const getTotalPrice = () =>
    cartItems.reduce(
      (sum, item) => sum + calculatePrice(item.size, item.crustStyle) * item.quantity,
      0
    );

  const handleCheckout = () => {
    toast.info("Thanh toán chưa được tích hợp 😅");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-green-900 mb-6">Giỏ hàng của bạn</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-600 font-semibold">Chưa có pizza trong giỏ hàng 🍕</p>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item, index) => (
            <div
              key={`${item.id}-${item.size}-${item.crustStyle}-${index}`}
              className="flex items-center gap-4 border-b pb-4"
            >
              <img
                src={item.coverImage}
                alt={item.title}
                className="w-24 h-24 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-green-900">{item.title}</h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-3 items-center">
                  {/* Size Selector */}
                  <div className="flex flex-col">
                    <label className="text-xs text-gray-500 mb-1">Kích cỡ</label>
                    <select
                      value={item.size}
                      onChange={(e) => updateItem(index, { size: parseInt(e.target.value) })}
                      className="border rounded text-green-900 font-semibold px-2 py-1 focus:outline-none focus:ring-1 focus:ring-green-600"
                    >
                      {getPizzaById(item.id)?.availableSizes.map((s) => (
                        <option key={s} value={s}>
                          {s} inch
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* Crust Selector */}
                  <div className="flex flex-col">
                    <label className="text-xs text-gray-500 mb-1">Đế bánh</label>
                    <select
                      value={item.crustStyle}
                      onChange={(e) => updateItem(index, { crustStyle: e.target.value })}
                      className="border rounded text-green-900 font-semibold px-2 py-1 focus:outline-none focus:ring-1 focus:ring-green-600"
                    >
                      {getPizzaById(item.id)?.availableCrusts.map((c) => (
                        <option key={c} value={c}>
                          {CRUST_STYLE_VN[c]}
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
                          // Regex to allow only numbers
                          const value = e.target.value;
                          if (/^\d*$/.test(value)) {
                            updateItem(index, {
                              quantity: value === "" ? 1 : Math.max(1, parseInt(value, 10)),
                            });
                          }
                        }}
                        onBlur={(e) => {
                          // If the input is empty, set to 1 on blur
                          if (!e.target.value) {
                            updateItem(index, { quantity: 1 });
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
              </div>

              {/* Price & Remove */}
              <div className="text-right items-end justify-between h-[75px] flex flex-col">
                <p className="text-green-900 font-bold">
                  {(calculatePrice(item.size, item.crustStyle) * item.quantity).toLocaleString()}₫
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
          ))}

          {/* Total */}
          <div className="text-right mt-6">
            <p className="text-xl font-bold text-green-900">
              Tổng cộng: {getTotalPrice().toLocaleString()}₫
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
