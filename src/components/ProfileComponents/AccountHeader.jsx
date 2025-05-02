import React from 'react';
import defaultAvatar from "../../assets/avatars/default.png";

export const AccountHeader = ({user}) => {
  return (
    <div className="flex flex-col items-center mt-4 mb-6">
      <div className="w-24 h-24 rounded-full overflow-hidden border-0 border-green-500 shadow-md">
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
