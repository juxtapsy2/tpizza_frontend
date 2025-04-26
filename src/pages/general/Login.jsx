import React, { useState } from "react";
import logo from "../../assets/logos/logo-remove-bg.png";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import PizzaBackground from "../../components/PizzaBackground/PizzaBackground";
import api from "../../config/api";
import { emailRegex, usernameRegex, passwordRegex } from "../../constants";

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

    // Check emptiness
    if (!formData.identifier || !formData.password) {
      return alert("Vui lòng điền đầy đủ thông tin.");
    }
    // Validate email format or username
    if (emailRegex.test(formData.identifier)) {
      // do nothing
    } else if (usernameRegex.test(formData.identifier)) {
      // do nothing
    } else {
      return alert("Vui lòng nhập một địa chỉ email hợp lệ hoặc tên đăng nhập hợp lệ.");
    }
    // Validate password ( > 8 chars, 1 number, 1 special char)
    if (!passwordRegex.test(formData.password)) {
      return alert("Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ, số và ký tự đặc biệt.");
    }

    const loginData = {
      identifier: formData.identifier, // could be either email or username
      password: formData.password,
    };

    try {
      const response = await api.post("/auth/login", loginData);

      if (response.status === 200) {
        // Success. Store the JWT in cookies
        console.log("Logged in:", response.data.message);
        document.cookie.split(";").forEach(cookie => {
          console.log(cookie);
        });
        
        window.location.href = "/";
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Đăng nhập thất bại, vui lòng thử lại.");
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

        <form onSubmit={handleSubmit} className="space-y-5">
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
