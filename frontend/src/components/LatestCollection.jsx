import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext.jsx";
import Title from "./Title.jsx";
import ProductItem from "./Productitem.jsx";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, [products]); // ← แก้ตรงนี้

  return (
    <div className="my-10">
      {/* Title */}
      <div className="py-8 text-center text-3xl">
        <Title text1={"SOMEZORN"} text2={" COLLECTION"} />

        <p className="m-auto w-3/4 text-xs text-gray-600 sm:text-sm md:text-base">
          “From one closet to another, fashion never dies.
          クローゼットからクローゼットへ、ファッションは永遠。”
        </p>
      </div>

      {/* Product */}
      <div className="grid grid-cols-2 gap-4 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {latestProducts.map((item) => (
          <ProductItem
            key={item._id}
            id={item._id}
            image={item.imageUrl} // backend ใช้อันนี้
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;
