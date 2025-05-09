import React, { useState, useEffect, useRef } from 'react';
import logo from "../../assets/logos/logo-remove-bg.png";
import { ShoppingCart, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { NAVLINKS } from '../../constants';
import { useAuth } from "../../contexts/AuthContext";
import UserMenu from '../UserMenu/UserMenu';
import api from "../../config/api";
import { logOutGate } from '../../routes/APIGates';
import { useCart } from '../../contexts/CartContext';

const NavBar = () => {
  const { cartCount } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef(null);
  const { user } = useAuth();
  const isAuthenticated = !!user; // user?	returns user if truthy, undefined/null if falsy
                                  // !!user	returns true if user is truthy, otherwise false
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 550);
    };
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        closeMenu();
      }
    };
    window.addEventListener('scroll', handleScroll);
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const openMenu = () => {
    setIsOpen(true);
  };

  const closeMenu = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 500); // Wait for the slide out animation to complete then unmount the menu
  };

  const handleLogOut = async () => {
    try {
      await api.post(logOutGate);
      window.location.href = "/login";
    } catch (err) {
      console.error("Không thể đăng xuất:", err);
    }
  };

  return (
    <>
      <nav className={`bg-white text-green-950 shadow-md fixed top-0 w-full z-[50] px-4 sm:px-8 transition-all duration-300 h-[70px] ${isScrolled ? 'hidden' : 'flex'} justify-between items-center`}>
        {/* Logo */}
        <Link to="/" className="flex items-center max-w-[200px] h-full">
          <img src={"logo2.img"} alt="TPizza Logo" className="h-full w-auto object-contain" />
        </Link>
        {/* Desktop Nav */}
        <div className="hidden md:flex h-full font-semibold text-lg items-center">
          {NAVLINKS.map(({ label, path }) => (
            <Link
              key={path}
              to={path}
              className="h-full min-w-[120px] flex items-center justify-center px-2 hover:bg-green-950 hover:text-white transition"
            >
              {label}
            </Link>
          ))}
        </div>
        {/* Right Side */}
        <div className="flex items-center space-x-4">
          {!isAuthenticated ? (
            <Link to="/login" className="hidden md:block px-3 py-1 rounded-xl font-medium hover:bg-green-950 hover:text-white transition">
              Đăng nhập
            </Link>
          ) : <UserMenu user={user} onLogout={handleLogOut}/>
          }

          <Link to='/cart' className="relative cursor-pointer hover:text-green-600 transition">
            <ShoppingCart size={26} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-900 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full animate-pulse">
                {cartCount}
              </span>
            )}
          </Link>

          <div className="md:hidden cursor-pointer" onClick={openMenu}>
            <Menu size={28} />
          </div>
        </div>
      </nav>
      {/* Mobile */}
      {(isOpen || isClosing) && (
        <div className="fixed right-0 inset-0 z-[9998] flex">
          {/* Blurred background */}
          <div className="absolute inset-0 bg-black/30 backdrop-blur-lg" onClick={closeMenu}>
            <div className="absolute top-1/2 left-2 -translate-y-1/2 text-white/70">
              <div className="absolute top-1/2 left-16 -translate-y-1/2 text-white/60 text-6xl animate-floatingArrow">
                ›
              </div>
            </div>
          </div>
          {/* Mobile Menu */}
          <div
            ref={menuRef}
            className={`absolute right-0 top-0 min-w-[50%] h-screen bg-green-900 text-white p-6 shadow-xl
              ${isClosing ? 'animate-slide-out-left' : 'animate-slide-in-right'}`}
          >
            <div className="flex justify-end mb-6">
              <button onClick={closeMenu} className="text-white hover:text-green-600">
                <X size={24} />
              </button>
            </div>
            {/* Navlinks */}
            <div className="flex flex-col gap-4">
              {NAVLINKS.map(({ label, path }, index) => (
                <React.Fragment key={path}>
                  <Link
                    to={path}
                    className="block py-2 px-3 rounded-md hover:bg-white hover:text-green-900 transition font-medium"
                    onClick={closeMenu}
                  >
                    {label}
                  </Link>
                  {index !== NAVLINKS.length - 1 && (
                    <hr className="border-t border-white/30" />
                  )}
                </React.Fragment>
              ))}
              <hr className="border-t border-white/30" />
              {!isAuthenticated && 
                <Link
                  to="/login"
                  className="block py-2 px-3 rounded-md hover:bg-white hover:text-green-900 transition font-medium"
                  onClick={closeMenu}
                >
                  Đăng nhập
                </Link>
              }
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;