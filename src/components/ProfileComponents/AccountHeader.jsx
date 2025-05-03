import React, { useRef } from 'react';
import defaultAvatar from "../../assets/avatars/default.png";
import { toast } from 'react-toastify';
import api from '../../config/api';
import { useNavigate } from 'react-router-dom';
import { uploadAvatarGate } from '../../routes/APIGates';

export const AccountHeader = ({ user, refreshUser }) => {
  const navigate = useNavigate();
  const fileInputRef = useRef();
  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result;

      try {
        const response = await api.put(uploadAvatarGate, { image: base64Image });
        toast.success('Cập nhật ảnh đại diện thành công');
        navigate(0);
      } catch (error) {
        toast.error('Lỗi khi cập nhật ảnh đại diện');
        console.error(error);
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col items-center mt-4 mb-6">
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      <div
        className="w-24 h-24 rounded-full overflow-hidden border-none shadow-md cursor-pointer hover:opacity-90"
        onClick={handleAvatarClick}
        title="Click để thay đổi ảnh đại diện"
      >
        <img
          src={user?.avatar || defaultAvatar}
          alt="User Avatar"
          className="w-full h-full object-cover"
        />
      </div>
      <h2 className="mt-3 text-lg font-semibold text-green-900">{user?.name || 'Người dùng'}</h2>
      <p className="text-sm text-green-700">{user?.username}</p>
    </div>
  );
};
