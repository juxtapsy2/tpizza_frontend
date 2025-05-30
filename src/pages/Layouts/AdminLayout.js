import React from 'react';
import { ToastContainer } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import { ADMIN_NAV_ITEMS } from '../../constants';
import logo from "../../assets/logos/logo-remove-bg.png";
import { Link } from 'react-router-dom';

const AdminLayout = ({ children }) => {
  const { hash } = useLocation();

  const isActive = (hashId) => hash === `#${hashId}`;

  return (
    <div className="min-h-screen bg-white text-green-950 flex">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar newestOnTop />

      {/* Sidebar */}
      <aside className="w-72 bg-white-950 shadow-md shadow-green-700 px-0 py-6">
        <Link to="/">
          <img src={logo} className="w-[110px] aspect-auto mb-4 mx-auto" />
        </Link>
        <nav className="space-y-1">
          {ADMIN_NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.path}
                href={`#${item.path}`}
                className={`flex items-center gap-3 px-8 py-3 text-lg transition ${
                  isActive(item.path)
                    ? 'bg-green-900 text-white'
                    : 'text-green-950 bg-white hover:bg-green-700 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </a>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 px-6 py-6 overflow-y-auto">{children}</main>
    </div>
  );
};

export default AdminLayout;
