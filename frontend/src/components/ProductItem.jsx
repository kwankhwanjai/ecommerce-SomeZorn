import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  const productImage = image?.[0] || "";

  return (
    <Link to={`/product/${id}`} className="group block w-full">
      <div className="w-full aspect-[4/5] overflow-hidden flex items-center justify-center">
        <img
          src={productImage}
          alt={name}
          className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="mt-3 min-h-[60px]">
        <p className="text-sm text-gray-800 font-medium leading-snug line-clamp-2">
          {name}
        </p>

        <p className="mt-1 text-sm font-semibold text-gray-900">
          {currency}
          {price}
        </p>
      </div>
    </Link>
  );
};

export default ProductItem;
