import React, { useState } from "react";
import logo from "../../assets/logo/logo-remove-bg.png";
import { Link } from "react-router-dom";
import PizzaBackground from "../../components/PizzaBackground/PizzaBackground";

const Forgot = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Requesting password reset for:", email);
    // Trigger password reset logic here
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen px-4 overflow-hidden">
      <PizzaBackground />
      {/* Forget Password Card */}
      <div className="relative z-10 w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">
        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="TPizza Logo" className="h-20 mb-2" />
          <h2 className="text-2xl font-bold text-green-900">Quên mật khẩu?</h2>
          <p className="text-sm text-gray-500 font-medium text-center">
            Nhập email của bạn để nhận liên kết đặt lại mật khẩu.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="pizza_lover@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-500 to-yellow-500 hover:from-green-600 hover:to-yellow-600 text-white py-2 rounded-xl font-semibold transition shadow-md"
          >
            📧 Gửi liên kết đặt lại
          </button>
        </form>

        <div className="flex items-center justify-between mt-4 text-sm">
          <Link
            to="/login"
            className="font-medium text-green-600 hover:text-green-500 transition-colors duration-300"
          >
            Quay lại đăng nhập
          </Link>
          <Link
            to="/register"
            className="font-medium text-green-600 hover:text-green-500 transition-colors duration-300"
          >
            Đăng ký tài khoản mới
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Forgot;
