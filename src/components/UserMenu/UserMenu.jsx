import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import default_avt from "../../assets/avatars/default.png";
import { MENU_ITEMS_BY_ROLE } from "../../constants";

export default function UserMenu({ user, onLogout }) {
  const [showMenu, setShowMenu] = useState(false);
  const leaveTimeout = useRef(null);

  const handleMouseEnter = () => {
    if (leaveTimeout.current) clearTimeout(leaveTimeout.current);
    setShowMenu(true);
  };

  const handleMouseLeave = () => {
    leaveTimeout.current = setTimeout(() => {
      setShowMenu(false);
    }, 300);
  };

  const role = user?.role || "User";
  const menuItems = MENU_ITEMS_BY_ROLE[role] || [];

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img
        src={user?.avatar || default_avt}
        alt="User avatar"
        className="w-10 h-10 rounded-full cursor-pointer"
      />
      {showMenu && (
        <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-xl p-2 z-50">
          {menuItems.map(({ label, path }) => (
            <Link
              key={path}
              to={path}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              {label}
            </Link>
          ))}
          <hr className="my-1" />
          <button
            onClick={onLogout}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
          >
            Đăng xuất
          </button>
        </div>
      )}
    </div>
  );
}
