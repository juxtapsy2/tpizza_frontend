import React from "react";
import logo from "../../assets/logos/logo.png";
import { Facebook, Instagram, Phone, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="z-[999] bg-green-950 text-white mt-10 py-10 px-6 md:px-16 rounded-none">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & About */}
        <div className="space-y-3">
          <img src={logo} alt="TPizza" className="h-16 w-auto" />
          <p className="text-sm">
            Hương vị pizza tươi ngon, đậm đà, phục vụ tận tâm mọi lúc mọi nơi!
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Điều hướng</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:underline">Trang chủ</a></li>
            <li><a href="/menu" className="hover:underline">Menu</a></li>
            <li><a href="/deals" className="hover:underline">Khuyến mãi</a></li>
            <li><a href="/contact" className="hover:underline">Liên hệ</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Liên hệ</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center space-x-2">
              <Phone size={16} /> <span>0123 456 789</span>
            </li>
            <li className="flex items-center space-x-2">
              <Mail size={16} /> <span>support@tpizza.vn</span>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Mạng xã hội</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-yellow-300 transition"><Facebook size={20} /></a>
            <a href="#" className="hover:text-yellow-300 transition"><Instagram size={20} /></a>
            {/* Add more as needed */}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-8 text-center text-xs text-gray-300">
        &copy; {new Date().getFullYear()} TPizza. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
