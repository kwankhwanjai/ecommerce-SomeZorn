import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";

const Order = () => {
  const { products, currency } = useContext(ShopContext);
  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1={"My"} text2={"ORDER"} />
      </div>
      <div>
        {products.slice(1, 4).map((item, index) => (
          <div
            key={index}
            className="relative py-4 border-t text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4 "
          >
            <div className="flex items-start gap-6 text-sm">
              <img className="w-15 sm:w-20" src={item.image[0]} alt="" />
              <div>
                <p className="sm:text-base font-medium ">{item.name}</p>
                <div className="flex items-cemter gap-3 mt-2 text-base text-gray-700">
                  <p className="text-lg">
                    {currency}
                    {item.price}
                  </p>
                  <p>Quantity: 1</p>
                  <p>Size: M</p>
                </div>
                <p className="mt-2">
                  Date: <span className="text-gray-400">01, June, 2026</span>
                </p>
              </div>
            </div>
            {/* STATUS - กลาง */}
            <div className="w-full md:absolute md:left-1/2 md:-translate-x-1/2 md:w-auto">
              <div className="flex items-center justify-center gap-2">
                <p className="min-w-2 h-2 rounded-full bg-[#A3B565]"></p>
                <p className="text-sm md:text-base">Ready to Ship</p>
              </div>
            </div>

            {/* BUTTON - ขวา */}
            <div className="w-full flex justify-end md:w-auto">
              <button className="border border-gray-300 px-5 h-10 text-sm font-medium rounded-lg flex items-center justify-center transition-all duration-200 hover:bg-[#A3B565] hover:text-white hover:border-[#A3B565] active:scale-95">
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
