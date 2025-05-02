// src/pages/Register.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../config/api";
import PizzaBackground from "../../components/PizzaBackground/PizzaBackground";
import { toast } from 'react-toastify';
import { usernameRegex, emailRegex, passwordRegex } from "../../constants";
import { Eye, EyeOff } from "lucide-react";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    gender: "Male",
    dateOfBirth: "",
    phone: "",
    email: "",
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.dateOfBirth || !formData.phone || !formData.email || !formData.username || !formData.password) {
      return toast.error("Vui lòng điền đầy đủ thông tin.");
    }
  
    if (emailRegex.test(formData.email)) {
      // valid email
    } else if (usernameRegex.test(formData.username)) {
      // valid username
    } else {
      return toast.error("Vui lòng nhập email/tên đăng nhập hợp lệ.");
    }
  
    if (!passwordRegex.test(formData.password)) {
      return toast.error("Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ, số và ký tự đặc biệt.");
    }

    try {
      await api.post("/auth/register", formData);
      setSuccess("Đăng ký thành công! Vui lòng xác nhận email.");
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Đăng ký thất bại.");
      setSuccess("");
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen px-4 overflow-hidden">
      <PizzaBackground />
      {/* Register Card */}
      <div className="relative z-10 w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">
        <div className="flex flex-col items-center mb-6">
          <h2 className="text-2xl font-bold text-green-900">Đăng ký tài khoản</h2>
          <p className="text-sm text-gray-500 font-medium">
            Cùng nhập tiệc🍕 ngon miệng!
          </p>
        </div>

        {error && <p className="text-red-600 text-center">{error}</p>}
        {success && <p className="text-green-600 text-center">{success}</p>}

        <form noValidate onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Họ và tên</label>
            <input
              type="text"
              name="name"
              placeholder="Nhập họ và tên"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              placeholder="pizza_lover@email.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Số điện thoại</label>
            <input
              type="text"
              name="phone"
              placeholder="Số điện thoại"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Tên đăng nhập</label>
            <input
              type="text"
              name="username"
              placeholder="username"
              value={formData.username}
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

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Ngày sinh</label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Giới tính</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="Male">Nam</option>
              <option value="Female">Nữ</option>
              <option value="Other">Khác</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-500 to-yellow-500 hover:from-green-600 hover:to-yellow-600 text-white py-2 rounded-xl font-semibold transition shadow-md"
          >
            Đăng ký
          </button>
        </form>

        <div className="flex items-center justify-between mt-4 text-sm">
          <span>Bạn đã có tài khoản? </span>
          <Link
            to="/login"
            className="font-medium text-green-600 hover:text-green-500 transition-colors duration-300"
          >
            Đăng nhập
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
