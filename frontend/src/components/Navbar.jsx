import { useContext, useEffect, useRef, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const profileRef = useRef(null);

  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext);

  const navItems = [
    { name: "HOME", path: "/" },
    { name: "COLLECTION", path: "/collection" },
    { name: "ABOUT", path: "/about" },
    { name: "CONTACT", path: "/contact" },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setCartItems?.({});
    setVisible(false);
    setShowProfile(false);
    navigate("/login");
  };

  const goToLogin = () => {
    setVisible(false);
    setShowProfile(false);
    navigate("/login");
  };

  const goToOrders = () => {
    setVisible(false);
    setShowProfile(false);
    navigate("/orders");
  };

  const goToProfile = () => {
    setVisible(false);
    setShowProfile(false);
    navigate("/profile");
  };

  return (
    <header className="sticky top-0 z-[999] border-b border-gray-100 bg-white/90 backdrop-blur-lg">
      <div className="flex items-center justify-between py-3 font-medium">
        <Link to="/" className="flex h-14 items-center">
          <img
            src={assets.logoSomezorn}
            className="w-16 object-contain md:w-20"
            alt="SomeZorn logo"
          />
        </Link>

        <nav className="hidden items-center gap-7 text-sm text-gray-700 sm:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `relative pb-1 transition duration-200 hover:text-black ${
                  isActive ? "text-black" : "text-gray-700"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span>{item.name}</span>
                  <span
                    className={`absolute left-1/2 -bottom-1 h-[1.5px] -translate-x-1/2 rounded-full bg-[#A3B565] transition-all duration-300 ${
                      isActive ? "w-8" : "w-0"
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3 sm:gap-5">
          <button
            type="button"
            onClick={() => setShowSearch(true)}
            className="rounded-full p-2 transition hover:bg-gray-100"
            aria-label="Search"
          >
            <img src={assets.search_icon} className="w-5" alt="" />
          </button>

          <div ref={profileRef} className="relative hidden sm:block">
            <button
              type="button"
              onClick={() => {
                if (!token) {
                  navigate("/login");
                  return;
                }
                setShowProfile((prev) => !prev);
              }}
              className={`rounded-full p-2 transition ${
                showProfile ? "bg-gray-100" : "hover:bg-gray-100"
              }`}
              aria-label="Account"
              aria-expanded={showProfile}
            >
              <img className="w-5" src={assets.profile_icon} alt="" />
            </button>

            {token && showProfile && (
              <div className="absolute right-0 top-12 z-[1000] w-52 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl">
                <div className="border-b border-gray-100 px-5 py-4">
                  <p className="text-sm font-medium text-black">Welcome back</p>
                  <p className="mt-1 text-xs text-gray-500">
                    Manage your account
                  </p>
                </div>

                <button
                  type="button"
                  onClick={goToProfile}
                  className="w-full px-5 py-3 text-left text-sm text-gray-600 transition hover:bg-gray-50 hover:text-black"
                >
                  My Profile
                </button>

                <button
                  type="button"
                  onClick={goToOrders}
                  className="w-full px-5 py-3 text-left text-sm text-gray-600 transition hover:bg-gray-50 hover:text-black"
                >
                  Orders
                </button>

                <Link
                  to="/cart"
                  onClick={() => setShowProfile(false)}
                  className="block w-full px-5 py-3 text-left text-sm text-gray-600 transition hover:bg-gray-50 hover:text-black"
                >
                  Cart
                </Link>

                <div className="border-t border-gray-100" />

                <button
                  type="button"
                  onClick={logout}
                  className="w-full px-5 py-3 text-left text-sm text-red-500 transition hover:bg-red-50"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          <Link
            to="/cart"
            className="relative rounded-full p-2 transition hover:bg-gray-100"
            aria-label="Cart"
          >
            <img src={assets.cart_icon} className="w-5 min-w-5" alt="" />
            <span className="absolute right-0 bottom-0 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[9px] leading-none text-white">
              {getCartCount()}
            </span>
          </Link>

          <button
            type="button"
            onClick={() => setVisible(true)}
            className="rounded-full p-2 transition hover:bg-gray-100 sm:hidden"
            aria-label="Open menu"
          >
            <img src={assets.menu_icon} className="w-5" alt="" />
          </button>
        </div>
      </div>

      <div
        onClick={() => setVisible(false)}
        className={`fixed inset-0 z-[1001] bg-black/30 transition-opacity duration-300 sm:hidden ${
          visible
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        className={`fixed right-0 top-0 z-[1002] h-screen w-[82%] max-w-[340px] bg-white shadow-2xl transition-transform duration-500 ease-out sm:hidden ${
          visible ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <p className="text-sm font-semibold tracking-[0.2em] text-gray-800">
            MENU
          </p>

          <button
            type="button"
            onClick={() => setVisible(false)}
            className="rounded-full px-3 py-1 text-sm text-gray-500 transition hover:bg-gray-100 hover:text-black"
          >
            Close
          </button>
        </div>

        <nav className="flex flex-col gap-1 px-5 py-5 text-gray-700">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              onClick={() => setVisible(false)}
              to={item.path}
              className={({ isActive }) =>
                `rounded-xl px-4 py-3 text-sm transition ${
                  isActive
                    ? "bg-gray-100 text-black"
                    : "hover:bg-gray-50 hover:text-black"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="mx-5 mt-3 border-t border-gray-100 pt-4">
          {!token ? (
            <button
              type="button"
              onClick={goToLogin}
              className="w-full rounded-xl bg-black px-4 py-3 text-sm text-white transition hover:opacity-90"
            >
              Login / Sign Up
            </button>
          ) : (
            <div className="flex flex-col gap-1">
              <button
                type="button"
                onClick={goToProfile}
                className="rounded-xl px-4 py-3 text-left text-sm text-gray-700 transition hover:bg-gray-50 hover:text-black"
              >
                My Profile
              </button>

              <button
                type="button"
                onClick={goToOrders}
                className="rounded-xl px-4 py-3 text-left text-sm text-gray-700 transition hover:bg-gray-50 hover:text-black"
              >
                Orders
              </button>

              <button
                type="button"
                onClick={logout}
                className="rounded-xl px-4 py-3 text-left text-sm text-red-500 transition hover:bg-red-50"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </aside>
    </header>
  );
};

export default Navbar;
