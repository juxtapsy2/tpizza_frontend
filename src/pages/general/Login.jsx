import React, { useState } from "react";
import logo from "../../assets/logos/logo-remove-bg.png";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import PizzaBackground from "../../components/PizzaBackground/PizzaBackground";
import api from "../../config/api";
import { PASSWORD_REGEX, USERNAME_REGEX, EMAIL_REGEX } from "../../constants";
import { toast } from 'react-toastify';
import { logInGate } from "../../routes/APIGates";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    identifier: "", // This will handle both email or username
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.identifier || !formData.password) {
      return toast.error("Vui lòng điền đầy đủ thông tin.");
    }
  
    if (EMAIL_REGEX.test(formData.identifier) || USERNAME_REGEX.test(formData.identifier)) {
      // valid username/email
    } else {
      return toast.error("Vui lòng nhập email/tên đăng nhập hợp lệ.");
    }
  
    if (!PASSWORD_REGEX.test(formData.password)) {
      return toast.error("Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ, số và ký tự đặc biệt.");
    }
  
    const loginData = {
      identifier: formData.identifier,
      password: formData.password,
    };
  
    try {
      const response = await api.post(logInGate, loginData);
  
      if (response.status === 200) {
        toast.success("Đăng nhập thành công! 🍕");
        setTimeout(() => {
          window.location.href = "/";
        }, 1500);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Đăng nhập thất bại, vui lòng thử lại.");
      }
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen px-4 overflow-hidden">
      <PizzaBackground />
      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">
        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="TPizza Logo" className="h-20 mb-2" />
          <h2 className="text-2xl font-bold text-green-900">Chào mừng</h2>
          <p className="text-sm text-gray-500 font-medium">
            Đăng nhập để đặt 🍕 nóng giòn!
          </p>
        </div>

        <form noValidate onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Email/Tên đăng nhập</label>
            <input
              type="text"
              name="identifier"
              placeholder="pizza_lover@email.com/pizza_lover"
              value={formData.identifier}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              required
              autoComplete="username"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Mật khẩu</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 pr-10 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-500 to-yellow-500 hover:from-green-600 hover:to-yellow-600 text-white py-2 rounded-xl font-semibold transition shadow-md"
          >
            🔥 Đăng nhập
          </button>
        </form>

        <div className="flex items-center justify-between mt-4">
          <div className="text-sm">
            <Link
              to="/forgot"
              className="font-medium text-green-600 hover:text-green-500 transition-colors duration-300"
            >
              Bạn quên mật khẩu?
            </Link>
          </div>
          <div className="text-sm">
            <span>Bạn chưa có tài khoản? </span>
            <Link
              to="/register"
              className="font-medium text-green-600 hover:text-green-500 transition-colors duration-300"
            >
              Đăng ký
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
