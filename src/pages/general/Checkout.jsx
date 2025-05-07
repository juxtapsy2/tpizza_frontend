import React, { useState, useEffect } from "react";
import { useCart } from "../../contexts/CartContext";
import api from '../../config/api';
import { toast } from "react-toastify";
import { CRUST_STYLE_VN } from "../../constants";
import MomoLogo from "../../assets/logos/momo.png";
import { momoPaymentGate, updateAddressGate } from "../../routes/APIGates";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Wallet, MapPin } from "lucide-react";

const Checkout = () => {
  const { user, setUser } = useAuth();
  const { cartItems, calculatePrice, calculateTotalPrice } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState(user?.address || ""); 
  const total = calculateTotalPrice();
  const navigate = useNavigate();

  const handleMomoPayment = async () => {
    setLoading(true);
    try {
      const response = await api.post(momoPaymentGate, {
        amount: total, 
        userId: user?._id,      
      });
      // Redirect the user to Momo's payment page
      window.location.href = response.data.payUrl;
    } catch (error) {
      console.error("Payment failed", error);
      toast.error("Yêu cầu thanh toán thất bại. Vui lòng thử lại.");
    }
    setLoading(false);
  };

  const handleCODPayment = async () => {
    if (!address) {
      toast.error("Vui lòng điền địa chỉ giao hàng!");
      return;
    }
    toast.success("Đặt hàng thành công với phương thức thanh toán COD!");
    navigate("/thanks?method=cod");
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleSubmitAddress = async () => {
    if (address.trim() === "") {
      toast.error("Địa chỉ không được để trống!");
      return;
    }

    try {
      const response = await api.put(updateAddressGate, { address }); 
      setUser({ ...user, address });
      toast.success("Địa chỉ đã được cập nhật!");
    } catch (error) {
      toast.error("Lỗi khi cập nhật địa chỉ. Vui lòng thử lại.");
    }
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

        {/* Address Section */}
        <div>
          <h3 className="text-xl font-semibold">Địa Chỉ Giao Hàng</h3>
          <textarea
            value={address}
            onChange={handleAddressChange}
            rows="3"
            className="w-full p-2 border border-gray-300 rounded-md mt-2"
            placeholder="Nhập địa chỉ giao hàng"
          />
          <div className = "flex flex-row justify-between">
            <div />
            <button
              onClick={handleSubmitAddress}
              className="w-[50%] py-2 bg-green-900 text-white font-semibold rounded-lg mt-4 hover:bg-green-600 flex items-center justify-center space-x-2"
            >
              <MapPin className="w-5 h-5" />
              <span>Cập Nhật Địa Chỉ</span>
            </button>
          </div>
        </div>

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
              className="w-full py-2  font-semibold bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition flex items-center justify-center space-x-2"
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
              onClick={handleCODPayment}
              className="w-full py-2 font-semibold bg-green-900 text-white rounded-lg hover:bg-green-600 transition flex items-center justify-center space-x-2"
            >
              <Wallet className="w-5 h-5" />
              <span>Đặt Hàng</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;