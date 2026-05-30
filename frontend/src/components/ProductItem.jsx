import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  const productImage = image?.[0] || "";

  return (
    <Link
      to={`/product/${id}`}
      className="group block h-full transition duration-300"
    >
      <article className="flex h-full flex-col">
        {/* Image */}
        <div className="relative overflow-hidden rounded-2xl bg-[#f6f6f6] aspect-[4/5]">
          {productImage ? (
            <>
              <img
                src={productImage}
                alt={name}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
              />

              <div className="absolute inset-0 bg-black/0 transition duration-300 group-hover:bg-black/[0.03]" />
            </>
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-gray-400">
              No image
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-1 flex-col pt-3">
          <h3 className="line-clamp-2 min-h-[42px] text-sm font-medium leading-5 text-gray-900">
            {name}
          </h3>

          <p className="mt-2 text-sm font-semibold text-gray-900">
            {currency}
            {price}
          </p>
        </div>
      </article>
    </Link>
  );
};

export default ProductItem;
