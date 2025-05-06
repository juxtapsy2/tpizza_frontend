import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { PIZZA_PRICES, CRUST_STYLE_VN } from "../../constants";
import { useCart } from "../../contexts/CartContext";

const PizzaDetails = ({ pizza, onClose }) => {
  const { addToCart, calculatePrice } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(pizza.defaultSize || 9); 
  const [selectedCrust, setSelectedCrust] = useState(pizza.defaultCrustStyle || "Thin");
  const modalRef = useRef();

  const price = calculatePrice(selectedSize, selectedCrust, PIZZA_PRICES);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleAddToCart = () => {
    addToCart({
      id: pizza._id,
      title: pizza.title,
      coverImage: pizza.coverImage,
      size: selectedSize,
      crustStyle: selectedCrust,
    }, quantity);
    onClose(); // Close the popup
  };

  if (!pizza) return null;
  // createPortal helps uplift the component outside of its container so it will always be displayed on top
  return createPortal(
    <div className="fixed inset-0 z-[9999] bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4">
      <div
        ref={modalRef}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col md:flex-row md:h-[450px] relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-green-950 hover:text-green-500 text-2xl font-bold z-10"
        >
          ×
        </button>

        {/* Image */}
        <div className="md:w-1/2 h-64 md:h-full">
          <img
            src={pizza.detailImage || pizza.coverImage}
            alt={pizza.title}
            loading="lazy"
            className="w-full h-full object-cover rounded-t-2xl md:rounded-t-none md:rounded-l-2xl"
          />
        </div>

        {/* Details */}
        <div className="flex-1 p-6 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-green-900 mb-2">{pizza.title}</h1>
            <p className="text-gray-700 mb-4">{pizza.description}</p>

            {/* Size Selection */}
            <div className="mb-4">
              <label className="block font-semibold text-green-950 mb-1">Kích cỡ:</label>
              <div className="flex gap-2">
                {pizza.availableSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1 rounded-full border font-medium cursor-pointer ${
                      selectedSize === size
                        ? "bg-green-900 text-white"
                        : "bg-white text-green-900 border-green-400"
                    }`}
                  >
                    {size} inch
                  </button>
                ))}
              </div>
            </div>

            {/* Crust Style Selection */}
            <div className="mb-4">
              <label className="block font-semibold text-green-950 mb-1">Đế bánh:</label>
              <div className="flex gap-2 flex-wrap">
                {pizza.availableCrusts.map((crust) => (
                  <button
                    key={crust}
                    onClick={() => setSelectedCrust(crust)}
                    className={`px-3 py-1 rounded-full border font-medium ${
                      selectedCrust === crust
                        ? "bg-green-900 text-white"
                        : "bg-white text-green-900 border-green-400"
                    }`}
                  >
                    {CRUST_STYLE_VN[crust]}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Price */}
            <div className="flex flex-row justify-between pt-4 pr-2">
              <div className="flex items-center gap-2">
                <label className="text-sm font-semibold text-green-950">Số lượng:</label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, +e.target.value))}
                  className="w-16 px-2 py-1 border rounded-md text-center text-green-950"
                  min={1}
                />
              </div>
              <div className="align-middle pt-1 text-xl font-bold text-green-950">
                Tổng: {(calculatePrice(selectedSize, selectedCrust, PIZZA_PRICES) * quantity).toLocaleString()}
                ₫
              </div>
            </div>
          </div>

          

          <button
            onClick={handleAddToCart}
            className="mt-6 bg-green-900 text-white font-semibold py-2 px-4 rounded-xl hover:bg-green-800 transition"
          >
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default PizzaDetails;
