import React from "react";
import { assets } from "../assets/assets";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between px-6 md:px-10 py-4 bg-white shadow-sm">
      <img className="w-[110px] object-contain" src={assets.logo} alt="logo" />

      <button className="bg-[#FCDD9D] hover:bg-[#F1642E] hover:text-white transition-all duration-300 text-[#504E76] px-6 py-2 rounded-full text-sm font-medium shadow-sm hover:shadow-md">
        Logout
      </button>
    </div>
  );
};

export default Navbar;
