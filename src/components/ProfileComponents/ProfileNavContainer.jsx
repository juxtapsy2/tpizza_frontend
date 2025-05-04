import React from "react";
import { NavLink } from "react-router-dom";
import { PROFILE_TABS } from "../../constants";

export const ProfileNavContainer = ({ isActive }) => (
  <div className="bg-green-950 rounded-lg shadow mb-4 w-full">
    <nav className="flex flex-wrap">
      {PROFILE_TABS.map(({ path, label, icon }) => (
        <NavLink
          key={path}
          to={`/profile${path}`}
          className={`flex items-center px-3 py-4 text-base font-medium border-b-2 flex-1 justify-center transition-colors ${
            isActive(path)
              ? "border-green-600 text-green-900 bg-white"
              : "border-transparent text-white hover:text-green-600 hover:border-gray-300 hover:bg-gray-50"
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
