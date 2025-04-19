import React, { useState, useEffect } from 'react';
import logo from "../../assets/logo/logo-remove-bg.png";
import { ShoppingCart, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { navLinks } from '../../constants';

const NavBar = () => {
  const [cartCount] = useState(0); 
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 550) {
        setIsScrolled(true); // Hide navbar when scrolling down 550px
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`bg-white text-green-950 shadow-md fixed top-0 rounded-none mx-auto w-full z-[9999] px-8 py-0 flex justify-between items-center transition-all duration-300 h-[70px] ${isScrolled ? 'hidden' : 'block'}`}>
      
      {/* Logo */}
      <Link to="/" className="flex items-center max-w-[200px] h-full">
        <img
          src={logo}
          alt="TPizza Logo"
          className="h-full w-auto object-contain"
        />
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex h-full space-x-0 font-semibold text-lg items-center">
        {navLinks.map(({ label, path }) => (
          <Link
            key={path}
            to={path}
            className="h-full min-w-[120px] flex items-center justify-center px-2 hover:bg-green-950 hover:text-white transition rounded-none"
          >
            {label}
          </Link>
        ))}
      </div>

      {/* Cart + Login + Menu icon */}
      <div className="flex items-center space-x-4">
        <Link
          to="/login"
          className="hidden md:block px-3 py-1 rounded-xl font-medium hover:bg-green-950 hover:text-white transition"
        >
          Đăng nhập
        </Link>

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
          {navLinks.map(({ label, path }) => (
            <Link
              key={path}
              to={path}
              className="px-3 py-2 rounded-xl hover:bg-white hover:text-green-900 transition"
            >
              {label}
            </Link>
          ))}
          <Link
            to="/login"
            className="px-3 py-2 rounded-xl hover:bg-white hover:text-green-900 transition"
          >
            Đăng nhập
          </Link>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
