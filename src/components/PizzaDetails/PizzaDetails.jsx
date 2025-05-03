import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const PizzaDetails = ({ pizza, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const modalRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  if (!pizza) return null;
  // Use createPortal to lift this component outside of its container to display on top level.
  return createPortal(
    <div className="fixed inset-0 z-[9999] bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4">
      <div
        ref={modalRef}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col md:flex-row md:h-[450px] relative"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-green-950 hover:text-green-500 text-2xl font-bold z-10"
        >
          ×
        </button>

        {/* Image section - left half */}
        <div className="md:w-1/2 h-64 md:h-full">
          <img
            src={pizza.detailImage || pizza.coverImage}
            alt={pizza.title}
            className="w-full h-full object-cover rounded-t-2xl md:rounded-t-none md:rounded-l-2xl"
          />
        </div>

        {/* Info section - right half */}
        <div className="flex-1 p-6 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-green-900 mb-2">{pizza.title}</h1>
            <p className="text-gray-700 mb-4">{pizza.description}</p>

            <div className="text-green-800 space-y-1 mb-6">
              <p><strong>Kích cỡ:</strong> {pizza.size} inch</p>
              <p><strong>Đế:</strong> {pizza.crustStyle}</p>
              <p><strong>Giá:</strong> {pizza.price.toLocaleString()}₫</p>
            </div>

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
          </div>

          <button
            onClick={() => console.log(`Add ${quantity} ${pizza.title} to cart`)}
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
