import React, { useState } from 'react';
import { ShoppingCart, Menu } from "lucide-react";
import logo from "../../assets/logo/logo2.png";

export const NavBar = () => {
  const [cartCount, setCartCount] = useState(2); // Giả sử có 2 sản phẩm trong giỏ hàng
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-red-600 p-4 text-white flex flex-row justify-between items-center min-w-[90%] z-9999">
      {/* Logo */}
      <div className="flex items-center space-x-2 max-w-[20px]">
        <img src={logo} alt="Logo" className="aspect-auto" />
        <span className="text-2xl font-bold">TPizza</span>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-6">
        <a href="/" className="hover:underline">Trang chủ</a>
        <a href="/menu" className="hover:underline">Menu</a>
        <a href="/deals" className="hover:underline">Khuyến mãi</a>
        <a href="/contact" className="hover:underline">Liên hệ</a>
      </div>

      {/* Giỏ hàng + Đăng nhập */}
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
        <div className="absolute top-16 left-0 w-full bg-red-700 p-4 flex flex-col space-y-4 text-center md:hidden">
          <a href="/" className="hover:underline">Trang chủ</a>
          <a href="/menu" className="hover:underline">Menu</a>
          <a href="/deals" className="hover:underline">Khuyến mãi</a>
          <a href="/contact" className="hover:underline">Liên hệ</a>
          <a href="/login" className="hover:underline">Đăng nhập</a>
        </div>
      )}
    </div>
  );
};
