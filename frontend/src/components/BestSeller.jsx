import React, { useContext, useMemo } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const BestSeller = () => {
  const { products = [] } = useContext(ShopContext);

  const bestSeller = useMemo(() => {
    return products
      .filter((item) => item.bestseller === true || item.bestseller === "true")
      .slice(0, 5);
  }, [products]);

  return (
    <section className="my-12 px-3 sm:px-4">
      <div className="rounded-[28px] bg-[#f8f8fa] px-4 py-8 sm:rounded-[32px] sm:px-6 sm:py-10 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col items-center text-center">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-gray-500">
            Customer Favorites
          </p>

          <div className="text-2xl sm:text-3xl">
            <Title text1="BEST" text2="SELLERS" />
          </div>

          <p className="mt-3 max-w-[520px] text-xs leading-6 text-gray-500 sm:text-sm">
            小さな幸せ、君と分けたい
          </p>
        </div>

        {bestSeller.length === 0 ? (
          <div className="rounded-[26px] border border-gray-200 bg-white px-6 py-16 text-center shadow-sm">
            <p className="text-sm font-medium text-gray-900">
              No best sellers yet
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Mark products as bestseller from your admin panel.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-5 md:grid-cols-4 lg:grid-cols-5">
            {bestSeller.map((item) => (
              <ProductItem
                key={item._id}
                id={item._id}
                name={item.name}
                image={item.imageUrl || item.image}
                price={item.price}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BestSeller;
