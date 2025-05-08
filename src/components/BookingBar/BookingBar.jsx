import React, { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { BOOKING_OPTIONS } from "../../constants";
import { useNavigate } from "react-router-dom";
import api from "../../config/api";
import { updateAddressGate } from "../../routes/APIGates";
import { toast } from "react-toastify";

const BookingBar = () => {
  const [activeOption, setActiveOption] = useState("delivery");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const handleBooking = async () => {
    if (activeOption === "delivery") {
      if (!address.trim()) {
        return;
      }
      try {
        await api.put(updateAddressGate, { address });
        navigate("/menu");
      } catch (err) {
        const message = err.response?.data?.message || "Không thể lưu địa chỉ";
        toast.error(message);
      }
    } else {
      localStorage.setItem("tpizza_takeaway", "true");
      navigate("/menu");
    }
  };

  return (
    <div className="w-full bg-green-950 text-white mt-8 py-4 px-4 sm:px-8 shadow-md z-40">
      <div className="max-w-7xl mx-auto flex flex-col gap-4 sm:flex-row items-center justify-between">
        {/* Option Buttons */}
        <div className="flex gap-2 w-full sm:w-1/2 justify-center sm:justify-start">
          {BOOKING_OPTIONS.map((option) => (
            <button
              key={option.id}
              onClick={() => setActiveOption(option.id)}
              className={`px-4 py-2 rounded-md font-medium transition ${
                activeOption === option.id
                  ? "bg-white text-green-950"
                  : "bg-green-900 hover:bg-green-800"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        {/* Address Input + Button */}
        <div className="flex w-full sm:w-1/2 items-center gap-2">
          <div className={`flex items-center bg-white text-black rounded-md px-3 py-2 flex-grow ${activeOption !== "delivery" ? "opacity-50 pointer-events-none" : ""}`}>
            <FaMapMarkerAlt className="text-green-950 mr-2" />
            <input
              type="text"
              placeholder="Nhập địa chỉ của bạn"
              className="bg-transparent outline-none w-full text-sm"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              disabled={activeOption !== "delivery"}
            />
          </div>
          <button
            onClick={handleBooking}
            className="bg-white text-green-950 hover:bg-gray-200 px-4 py-2 rounded-md font-medium transition"
          >
            Đặt ngay
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingBar;