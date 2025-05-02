import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../../config/api';
import { useNavigate } from 'react-router-dom';
import { passwordRegex } from '../../constants';

export const TabProfile = ({ user }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    gender: user?.gender || '',
  });
  const [password, setPassword] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [updatedUser, setUpdatedUser] = useState(user); // Hold updated user data
  const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);

  // Fetch updated user data
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone,
        gender: user.gender,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put("/user/me/update", formData);

      if (response.status === 200) {
        toast.success("Cập nhật thông tin thành công! 🍕");
        // Fetch updated user data
        navigate(0);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Không thể cập nhật, vui lòng thử lại.");
      }
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
  
    const passwordNotFilled = !password.currentPassword || !password.newPassword || !password.confirmPassword;
    if (passwordNotFilled) {
      return toast.error("Vui lòng điền đầy đủ thông tin mật khẩu.");
    }
    const passwordConfirmWrong = password.newPassword !== password.confirmPassword;
    if (passwordConfirmWrong) {
      toast.error('Mật khẩu mới không khớp');
      return;
    }
    const passwordFormatWrong = !passwordRegex.test(password.newPassword) || !passwordRegex.test(password.confirmPassword);
    if (passwordFormatWrong) {
      return toast.error("Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ, số và ký tự đặc biệt.");
    }
    // Only check this after the others for security reasons.
    const passwordRepeated = password.newPassword === password.currentPassword;
    if (passwordRepeated) {
      return toast.error("Mật khẩu mới không được trùng với mật khẩu cũ.");
    }
  
    try {
      const response = await api.put("/user/me/change-password", {
        currentPassword: password.currentPassword,
        newPassword: password.newPassword,
        confirmPassword: password.confirmPassword,
      });
  
      if (response.status === 200) {
        toast.success("Mật khẩu đã được thay đổi thành công!");
        navigate(0);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Không thể thay đổi mật khẩu, vui lòng thử lại.");
      }
    }
  };

  return (
    <div className="space-y-10">
      {/* Profile Form */}
      <form onSubmit={handleProfileSubmit} className="space-y-6">
        <h2 className="text-xl font-semibold text-green-950">Cập nhật thông tin cá nhân</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-green-950">Họ và tên</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full border border-green-300 rounded px-3 py-2 focus:outline-none focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-green-950">Email</label>
            <input
              disabled
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full border text-gray-500 border-green-300 rounded px-3 py-2 focus:outline-none focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-green-950">Số điện thoại</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 block w-full border border-green-300 rounded px-3 py-2 focus:outline-none focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-green-950">Giới tính</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="mt-1 block w-full border border-green-300 rounded px-3 py-2 focus:outline-none focus:ring-green-500 focus:border-green-500"
            >
              <option value="" disabled >Chọn</option>
              <option value="Male">Nam</option>
              <option value="Female">Nữ</option>
              <option value="Other">Khác</option>
            </select>
          </div>
        </div>
        <button
          type="submit"
          className="px-6 py-2 bg-green-900 text-white rounded hover:bg-green-700 font-semibold"
        >
          Lưu thay đổi
        </button>
      </form>

      {/* Password Change Toggle */}
      <div className="border-t pt-8">
        <button
          onClick={() => setShowChangePasswordForm(!showChangePasswordForm)}
          className="text-green-900 font-medium hover:underline"
        >
          {showChangePasswordForm ? 'Ẩn thay đổi mật khẩu' : 'Thay đổi mật khẩu'}
        </button>
      </div>

      {/* Password Change Form */}
      {showChangePasswordForm && (
        <form onSubmit={handlePasswordSubmit} className="space-y-6">
          <h2 className="text-xl font-semibold text-green-950">Đổi mật khẩu</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-950-600">Mật khẩu hiện tại</label>
              <input
                type="password"
                name="currentPassword"
                value={password.currentPassword}
                onChange={handlePasswordChange}
                className="mt-1 block w-full border border-green-300 rounded px-3 py-2 focus:outline-none focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-green-950">Mật khẩu mới</label>
              <input
                type="password"
                name="newPassword"
                value={password.newPassword}
                onChange={handlePasswordChange}
                className="mt-1 block w-full border border-green-300 rounded px-3 py-2 focus:outline-none focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-green-950">Xác nhận mật khẩu</label>
              <input
                type="password"
                name="confirmPassword"
                value={password.confirmPassword}
                onChange={handlePasswordChange}
                className="mt-1 block w-full border border-green-300 rounded px-3 py-2 focus:outline-none focus:ring-green-500 focus:green-red-500"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="px-6 py-2 bg-green-900 text-white rounded hover:bg-green-700 font-semibold"
          >
            Đổi mật khẩu
          </button>
        </form>
      )}
    </div>
  );
};
