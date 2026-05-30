import React, { useContext, useMemo } from "react";
import { ShopContext } from "../context/ShopContext.jsx";
import Title from "./Title.jsx";
import ProductItem from "./Productitem.jsx";

const LatestCollection = () => {
  const { products = [] } = useContext(ShopContext);

  const latestProducts = useMemo(() => {
    return [...products].slice(0, 10);
  }, [products]);

  return (
    <section className="my-12 px-3 sm:px-4">
      <div className="rounded-[28px] bg-white px-4 py-8 sm:rounded-[32px] sm:px-6 sm:py-10 lg:px-8">
        {/* Header */}
        <div className="mb-8 border-b border-gray-200 pb-6 text-center">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-gray-500">
            New Arrivals
          </p>

          <div className="text-2xl sm:text-3xl">
            <Title text1={"SOMEZORN"} text2={"COLLECTION"} />
          </div>

          <p className="mx-auto mt-3 max-w-[600px] text-xs leading-6 text-gray-500 sm:text-sm">
            From one closet to another, fashion never dies.
            <br />
            クローゼットからクローゼットへ、ファッションは永遠。
          </p>
        </div>

        {/* Products */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-5 md:grid-cols-4 lg:grid-cols-5">
          {latestProducts.map((item) => (
            <ProductItem
              key={item._id}
              id={item._id}
              image={item.imageUrl || item.image}
              name={item.name}
              price={item.price}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestCollection;
