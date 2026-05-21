import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";

const Order = () => {
  const { products, currency } = useContext(ShopContext);

  return (
    <div className="border-t pt-10 sm:pt-16 px-4 sm:px-0">
      <div className="text-xl sm:text-2xl mb-6">
        <Title text1={"My"} text2={"ORDER"} />
      </div>

      <div className="space-y-4">
        {products.slice(1, 4).map((item, index) => (
          <div
            key={index}
            className="border rounded-2xl p-4 sm:p-5 text-gray-700 bg-white flex flex-col md:flex-row md:items-center md:justify-between gap-5"
          >
            <div className="flex gap-4 sm:gap-6 items-start">
              <img
                className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-xl bg-gray-50"
                src={(item.imageUrl || item.image)?.[0] || ""}
                alt={item.name}
              />

              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm sm:text-base leading-snug line-clamp-2">
                  {item.name}
                </p>

                <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-600">
                  <p className="font-medium text-gray-800">
                    {currency}
                    {item.price}
                  </p>
                  <p>Qty: 1</p>
                  <p>Size: M</p>
                </div>

                <p className="mt-2 text-xs sm:text-sm text-gray-500">
                  Date: <span>01, June, 2026</span>
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row sm:items-center justify-between md:justify-end gap-3 border-t md:border-t-0 pt-4 md:pt-0">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#A3B565]"></span>
                <p className="text-sm">Ready to Ship</p>
              </div>

              <button className="w-full sm:w-auto border border-gray-300 px-5 h-10 text-sm font-medium rounded-lg transition-all duration-200 hover:bg-[#A3B565] hover:text-white hover:border-[#A3B565] active:scale-95">
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
