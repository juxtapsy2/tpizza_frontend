import React, { useState } from 'react';
import { ShoppingCart, Menu } from "lucide-react";
import logo from "../../assets/logo/logo-remove-bg.png";

const NavBar = () => {
  const [cartCount] = useState(0); 
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white text-green-950 shadow-md sticky top-0 rounded-none mx-auto w-full z-[999] px-8 py-2 flex justify-between items-center transition-all duration-300">
      {/* Logo */}
      <div className="flex items-center max-w-[200px]">
        <img
          src={logo}
          alt="TPizza Logo"
          className="h-[60px] w-auto object-contain"
        />
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-6 font-semibold text-lg">
        <a href="/" className="hover:text-green-600 transition">Trang chủ</a>
        <a href="/menu" className="hover:text-green-600 transition">Menu</a>
        <a href="/deals" className="hover:text-green-600 transition">Khuyến mãi</a>
        <a href="/contact" className="hover:text-green-600 transition">Liên hệ</a>
      </div>

      {/* Cart + Login + Menu icon */}
      <div className="flex items-center space-x-4">
        <a href="/login" className="hidden md:block hover:text-green-600 font-medium transition">Đăng nhập</a>
        
        <div className="relative cursor-pointer hover:text-green-600 transition">
          <ShoppingCart size={26} />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-white text-red-600 text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full animate-pulse">
              {cartCount}
            </span>
          )}
        </div>

        {/* Hamburger icon */}
        <div className="md:hidden cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
          <Menu size={28} />
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-20 left-2 right-2 bg-green-900 text-white rounded-xl p-4 flex flex-col space-y-4 text-center md:hidden shadow-lg z-50">
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
