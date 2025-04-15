import React, { useState } from 'react';
import { ShoppingCart, Menu } from "lucide-react";
import logo from "../../assets/logo/logo-remove-bg.png";

const NavBar = () => {
  const [cartCount, ] = useState(2); // Giả sử có 2 sản phẩm trong giỏ hàng
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white text-green-900 border-none rounded-xl flex flex-row justify-between items-center m-middle mt-3 w-[95%] z-9999">
      {/* Logo */}
      <div className="flex items-center space-x-2 max-w-[200px]">
        <img src={logo} alt="TPizza Logo" className="h-[80px] apsect-auto border-none border-r-8" />
      </div>

      {/* Navigation Menu */}
      <div className="hidden md:flex space-x-6 font-semibold">
        <a href="/" className="hover:underline">Trang chủ</a>
        <a href="/menu" className="hover:underline">Menu</a>
        <a href="/deals" className="hover:underline">Khuyến mãi</a>
        <a href="/contact" className="hover:underline">Liên hệ</a>
      </div>

      {/* Cart + Login */}
      <div className="flex items-center space-x-4">
        <a href="/login" className="hover:underline hidden md:block">Đăng nhập</a>
        <div className="relative cursor-pointer">
          <ShoppingCart size={24} />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-white text-red-600 text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {cartCount}
            </span>
          )}
        </div>
        {/* Menu icon for mobile */}
        <div className="md:hidden cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
          <Menu size={28} />
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-green-900 p-4 flex flex-col space-y-4 text-center md:hidden text-white">
          <a href="/" className="hover:underline">Trang chủ</a>
          <a href="/menu" className="hover:underline">Menu</a>
          <a href="/deals" className="hover:underline">Khuyến mãi</a>
          <a href="/contact" className="hover:underline">Liên hệ</a>
          <a href="/login" className="hover:underline">Đăng nhập</a>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
