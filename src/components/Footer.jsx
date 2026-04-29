import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <img
            src={assets.logoSomezorn}
            className="mb-0 w-40 object-contain"
            alt=""
          />
          <p className="-mt-2 w-full md:w-2/3 text-gray-600">
            Somezorn is a leading e-commerce platform that offers a wide range
            of carefully selected products, focused on simplicity, quality, and
            a smooth shopping experience.
          </p>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-3 text-gray-600">
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        <div>
          <p className="text-xl font-medium mb-5"> GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>061-146-0405</li>
            <li>support@somezorn.com</li>
          </ul>
        </div>

        <div className="col-span-full">
          <hr />
          <p className="py-5 text-sm text-center">
            Copyright 2026@ forever.com - All Right
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
