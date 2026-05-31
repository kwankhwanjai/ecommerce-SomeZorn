import React, { useContext, useMemo } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "./ProductItem";
import Title from "./Title";

const RelateProducts = ({ category, subCategory, currentProductId }) => {
  const { products = [] } = useContext(ShopContext);

  const related = useMemo(() => {
    return products
      .filter(
        (item) =>
          item.category === category &&
          item.subCategory === subCategory &&
          item._id !== currentProductId,
      )
      .slice(0, 5);
  }, [products, category, subCategory, currentProductId]);

  if (related.length === 0) return null;

  return (
    <section className="my-20 sm:my-24">
      <div className="mb-8 text-center">
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-gray-500">
          You may also like
        </p>

        <div className="text-2xl sm:text-3xl">
          <Title text1="RELATED" text2="PRODUCTS" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-5 md:grid-cols-4 lg:grid-cols-5">
        {related.map((item) => (
          <ProductItem
            key={item._id}
            id={item._id}
            name={item.name}
            price={item.price}
            image={item.imageUrl || item.image}
          />
        ))}
      </div>
    </section>
  );
};

export default RelateProducts;
