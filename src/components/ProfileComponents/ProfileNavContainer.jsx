import React from "react";
import { NavLink } from "react-router-dom";
import { profileTabs } from "../../constants";

export const ProfileNavContainer = ({ isActive }) => (
  <div className="bg-white rounded-lg shadow mb-4">
    <nav className="flex flex-wrap">
      {profileTabs.map(({ path, label, icon }) => (
        <NavLink
          key={path}
          to={`/profile${path}`}
          className={`flex items-center px-3 py-4 text-base font-medium border-b-2 flex-1 justify-center transition-colors ${
            isActive(path)
              ? "border-green-600 text-green-600 bg-green-50"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:bg-gray-50"
          }`}
        >
          <svg
            className="w-5 h-5 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={icon}
            />
          </svg>
          {label}
        </NavLink>
      ))}
    </nav>
  </div>
);
