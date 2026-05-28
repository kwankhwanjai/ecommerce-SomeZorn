import React from "react";
import { NavLink } from "react-router-dom";
import { PlusSquare, LayoutList, ShoppingBag } from "lucide-react";

const menuItems = [
  {
    path: "/add",
    label: "Add Item",
    icon: PlusSquare,
  },
  {
    path: "/list",
    label: "List Items",
    icon: LayoutList,
  },
  {
    path: "/orders",
    label: "Orders",
    icon: ShoppingBag,
  },
];

const Sidebar = () => {
  return (
    <aside className="min-h-screen w-[76px] border-r border-gray-200/70 bg-white/60 px-2 py-5 backdrop-blur-xl sm:w-[220px] sm:px-4">
      {/* TOP */}
      <div className="mb-7 hidden sm:block">
        <p className="text-[10px] uppercase tracking-[0.24em] text-gray-400">
          Navigation
        </p>

        <h2 className="mt-1 text-base font-semibold text-gray-900">
          Dashboard
        </h2>
      </div>

      {/* MENU */}
      <nav className="flex flex-col gap-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `group relative flex items-center justify-center gap-3 overflow-hidden rounded-2xl px-3 py-3 text-sm font-medium transition-all duration-300 sm:justify-start ${
                  isActive
                    ? "bg-gray-900 text-white shadow-[0_10px_30px_rgba(0,0,0,0.12)]"
                    : "text-gray-500 hover:bg-white/80 hover:text-gray-900"
                }`
              }
            >
              {/* glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-100/0 via-indigo-100/10 to-pink-100/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              {/* icon */}
              <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-white/70 shadow-sm backdrop-blur-md transition-all duration-300 group-hover:scale-105">
                <Icon
                  size={18}
                  strokeWidth={2}
                  className="transition-all duration-300"
                />
              </div>

              {/* text */}
              <span className="relative hidden sm:block">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
