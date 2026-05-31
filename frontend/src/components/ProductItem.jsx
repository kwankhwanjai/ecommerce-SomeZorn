import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  const productImage = Array.isArray(image) ? image[0] : image || "";

  return (
    <Link to={`/product/${id}`} className="group block h-full">
      <article className="flex h-full flex-col transition duration-300 group-hover:-translate-y-1">
        {/* Image */}
        <div className="relative aspect-[4/5] overflow-hidden rounded-[22px] bg-[#f5f5f5]">
          {productImage ? (
            <>
              <img
                src={productImage}
                alt={name}
                loading="lazy"
                className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.05]"
              />

              <div className="absolute inset-0 bg-black/0 transition duration-300 group-hover:bg-black/[0.03]" />

              <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 backdrop-blur-sm">
                <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-gray-600">
                  Vintage Piece
                </span>
              </div>
            </>
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-gray-400">
              No image
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col pt-3">
          <h3 className="line-clamp-2 min-h-[44px] text-sm font-medium leading-5 text-gray-900">
            {name}
          </h3>

          <div className="mt-auto pt-2">
            <p className="text-sm font-semibold text-gray-900">
              {currency}
              {price}
            </p>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default ProductItem;
