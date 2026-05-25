import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  const productImage = image?.[0] || "";

  return (
    <Link to={`/product/${id}`} className="group block w-full">
      <div className="w-full aspect-[4/5] overflow-hidden rounded-xl bg-[#f8f8f8]">
        {productImage ? (
          <img
            src={productImage}
            alt={name}
            className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-400 text-sm">
            No image
          </div>
        )}
      </div>

      <div className="mt-3">
        <p className="text-sm text-gray-800 line-clamp-2">{name}</p>

        <p className="mt-1 font-medium">
          {currency}
          {price}
        </p>
      </div>
    </Link>
  );
};

export default ProductItem;
