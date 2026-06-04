import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="mt-24 border-t border-stone-200">
      <div className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid gap-12 md:grid-cols-[2fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <img
              src={assets.logoSomezorn}
              alt="Somezorn"
              className="w-40 object-contain"
            />

            <p className="mt-4 max-w-md text-sm leading-7 text-stone-600">
              Curated secondhand pieces with timeless character, natural tones,
              and everyday comfort.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-stone-900">
              Explore
            </h3>

            <ul className="space-y-3 text-sm text-stone-600">
              <li className="cursor-pointer hover:text-stone-900">Home</li>

              <li className="cursor-pointer hover:text-stone-900">
                Collection
              </li>

              <li className="cursor-pointer hover:text-stone-900">About</li>

              <li className="cursor-pointer hover:text-stone-900">Contact</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-stone-900">
              Contact
            </h3>

            <ul className="space-y-3 text-sm text-stone-600">
              <li>061-146-0405</li>
              <li>support@somezorn.com</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-stone-200 pt-6">
          <p className="text-center text-xs tracking-wide text-stone-500">
            © 2026 SOMEZORN. Curated with care.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
