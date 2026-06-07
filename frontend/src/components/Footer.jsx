import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="mt-32 border-t border-stone-200 bg-stone-50">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 md:grid-cols-[2fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <img
              src={assets.logoSomezorn}
              alt="Somezorn"
              className="w-40 object-contain"
            />

            <p className="mt-5 max-w-md text-sm leading-7 text-stone-600">
              Thoughtfully selected vintage and secondhand pieces, chosen for
              their character, quality, and timeless appeal.
            </p>

            <div className="mt-6 flex items-center gap-5">
              <a
                href="#"
                className="text-stone-500 transition hover:text-stone-900"
              >
                Instagram
              </a>

              <a
                href="#"
                className="text-stone-500 transition hover:text-stone-900"
              >
                Facebook
              </a>

              <a
                href="#"
                className="text-stone-500 transition hover:text-stone-900"
              >
                TikTok
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-stone-900">
              Explore
            </h3>

            <ul className="space-y-4 text-sm text-stone-600">
              <li className="cursor-pointer transition-colors duration-300 hover:text-stone-900">
                Home
              </li>

              <li className="cursor-pointer transition-colors duration-300 hover:text-stone-900">
                Collection
              </li>

              <li className="cursor-pointer transition-colors duration-300 hover:text-stone-900">
                About
              </li>

              <li className="cursor-pointer transition-colors duration-300 hover:text-stone-900">
                Contact
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-stone-900">
              Contact
            </h3>

            <ul className="space-y-4 text-sm text-stone-600">
              <li>061-146-0405</li>
              <li>support@somezorn.com</li>
            </ul>

            <div className="mt-8">
              <p className="mb-3 text-sm text-stone-700">
                Stay updated with new arrivals.
              </p>

              <div className="flex overflow-hidden rounded-lg border border-stone-300">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full bg-white px-4 py-3 text-sm outline-none"
                />

                <button className="bg-stone-900 px-5 text-sm text-white transition hover:opacity-90">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-stone-200 pt-6">
          <p className="text-center text-xs tracking-wider text-stone-500">
            © 2026 SOMEZORN — Vintage finds, thoughtfully curated.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
