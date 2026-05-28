import React from "react";
import { assets } from "../assets/assets";

const Navbar = ({ setToken }) => {
  return (
    <header className="h-[68px] border-b border-gray-200/70 bg-white/70 backdrop-blur-xl">
      <div className="flex h-full items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-3">
          <img
            className="w-[84px] object-contain md:w-[96px]"
            src={assets.logo}
            alt="SomeZorn logo"
          />

          <div className="hidden sm:block">
            <p className="text-[10px] uppercase tracking-[0.24em] text-gray-400">
              Admin Panel
            </p>
            <h1 className="text-sm font-semibold text-gray-800 md:text-base">
              SomeZorn Dashboard
            </h1>
          </div>
        </div>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            setToken("");
          }}
          className="rounded-full border border-gray-200 bg-white/70 px-4 py-2 text-xs font-medium text-gray-700 shadow-sm backdrop-blur-md transition-all duration-300 hover:bg-gray-900 hover:text-white md:px-5 md:text-sm"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;
