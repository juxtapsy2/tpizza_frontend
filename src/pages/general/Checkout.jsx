import React, { useState } from "react";
import { useCart } from "../../contexts/CartContext";
import api from '../../config/api';
import { toast } from "react-toastify";
import { CRUST_STYLE_VN } from "../../constants";
import MomoLogo from "../../assets/logos/momo.png";

const Checkout = () => {
  const { cartItems, calculatePrice, calculateTotalPrice } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [loading, setLoading] = useState(false);
  const total = calculateTotalPrice();

  const handleMomoPayment = async () => {
    setLoading(true);
    try {
      // Call your backend to create a Momo payment request
      const response = await api.post("/api/momo-payment", {
        amount: total,  // Total amount for payment
        id: new Date().toISOString(),  // Unique order ID
      });

      // Redirect the user to Momo's payment page
      window.location.href = response.data.payUrl;
    } catch (error) {
      console.error("Payment failed", error);
      toast.error("Yêu cầu thanh toán thất bại. Vui lòng thử lại.");
    }
    setLoading(false);
  };

  return (
    <div className="checkout-container p-8 mt-20 max-w-lg mx-auto bg-white text-green-950 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Thanh Toán</h2>

      <div className="space-y-4">
        {/* Cart Review Section */}
        <div>
          <h3 className="text-xl font-semibold">Đơn Hàng Của Bạn</h3>
          <div className="space-y-2">
            {cartItems.map((item, index) => (
              <div key={index} className="border-b py-2">
                <div className="flex justify-between items-center">
                  <div className="font-semibold">{item.title}</div>
                  <div>{(calculatePrice(item) * item.quantity).toLocaleString()} ₫</div>
                </div>
                <div className="text-sm text-gray-500">
                  <p>Cỡ: {item.size}</p>
                  <p>Đế: {CRUST_STYLE_VN[item.crustStyle]}</p>
                  {item.toppings && item.toppings.length > 0 && (
                    <p>Đồ ăn kèm: {item.toppings.join(", ")}</p>
                  )}
                  <p>Số lượng: {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Method Section */}
        <div>
          <h3 className="text-xl font-semibold">Phương Thức Thanh Toán</h3>
          <div className="space-y-4 mt-4 block">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                value="cash"
                checked={paymentMethod === "cash"}
                onChange={() => setPaymentMethod("cash")}
                className="peer hidden"
              />
              <div className="w-4 h-4 rounded-full border-2 border-green-900 peer-checked:bg-green-900 peer-checked:ring-inset peer-checked:ring-white peer-checked:ring-2 transition-all duration-200"></div>
              <span className="text-sm text-green-950 font-semibold">Thanh Toán Khi Nhận Hàng</span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                value="momo"
                checked={paymentMethod === "momo"}
                onChange={() => setPaymentMethod("momo")}
                className="peer hidden"
              />
              <div className="w-4 h-4 rounded-full border-2 border-pink-500 peer-checked:bg-pink-500 peer-checked:ring-inset peer-checked:ring-white peer-checked:ring-2 transition-all duration-200"></div>
              <span className="text-sm text-pink-950 font-semibold">Thanh Toán Qua Momo</span>
            </label>
          </div>
        </div>

        <hr />

        {/* Order Summary Section */}
        <div className="order-summary">
          <h3 className="text-xl font-semibold">Tổng cộng</h3>
          <div className="flex justify-between py-2 font-semibold">
            <div></div>
            <div>{total.toLocaleString()} ₫</div>
          </div>
        </div>

        <div className="mt-4">
          {paymentMethod === "momo" ? (
            <button
              onClick={handleMomoPayment}
              className="w-full py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition flex items-center justify-center space-x-2"
            >
              {loading ? (
                "Đang xử lý..."
              ) : (
                <>
                  <img src={MomoLogo} alt="Momo" className="w-5 h-5" />
                  <span>Thanh Toán Qua Momo</span>
                </>
              )}
            </button>
          ) : (
            <button
              className="w-full py-2 bg-green-900 text-white rounded-lg hover:bg-green-600 transition flex items-center justify-center space-x-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75h19.5m-19.5 0A2.25 2.25 0 004.5 4.5h15a2.25 2.25 0 012.25 2.25m-19.5 0v10.5A2.25 2.25 0 004.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75m-6.75 7.5H9.75" />
              </svg>
              <span>Đặt Hàng</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;