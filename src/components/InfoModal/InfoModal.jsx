import React from 'react';
import { X } from 'lucide-react'; // Assuming you're using an icon library

const InfoModal = ({ title, details, isOpen, onClose }) => {
  if (!isOpen) return null;

  // Format the date if it's a Date object
  const formatDate = (date) => {
    if (date instanceof Date) {
      return date.toLocaleString();
    }
    return date;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl p-6 relative animate-fade-in">
        {/* Close Icon */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-green-900 transition">
          <X size={20} />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-green-900 mb-6 text-center">{title}</h2>

        {/* Details (dynamically generated) */}
        <div className="space-y-6">
          {details.map((detail, index) => (
            <div key={index} className="flex justify-between">
              <span className="font-medium text-sm text-green-950">{detail.label}:</span>
              <span>
                {typeof detail.value === 'object' && detail.value instanceof Date
                  ? formatDate(detail.value)
                  : detail.value}
              </span>
            </div>
          ))}
        </div>
        {/* Close Button */}
        <div className="mt-8 text-center">
          <button
            onClick={onClose}
            className="inline-block px-6 py-2 bg-green-900 text-white rounded-md hover:bg-green-700 transition"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;