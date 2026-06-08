import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } =
    useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item],
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  return (
    <div className="border-t pt-10 sm:pt-14 px-4 sm:px-0">
      <div className="text-xl sm:text-2xl mb-6">
        <Title text1="Your" text2="Cart" />
      </div>

      <div className="space-y-4">
        {cartData.map((item, index) => {
          const productData = products.find(
            (product) => product._id === item._id,
          );

          if (!productData) return null;

          return (
            <div
              key={index}
              className="border rounded-2xl p-4 bg-white text-gray-700"
            >
              <div className="flex gap-4">
                <img
                  className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-xl bg-gray-50"
                  src={(productData.imageUrl || productData.image)?.[0] || ""}
                  alt={productData.name}
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm sm:text-lg font-medium leading-snug line-clamp-2">
                      {productData.name}
                    </p>

                    <button
                      onClick={() => updateQuantity(item._id, item.size, 0)}
                      className="shrink-0 p-2 rounded-full hover:bg-gray-100 transition"
                    >
                      <img
                        className="w-4 sm:w-5"
                        src={assets.bin_icon}
                        alt="Remove item"
                      />
                    </button>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-3 text-sm sm:text-base">
                    <p className="font-medium text-gray-900">
                      {currency}
                      {productData.price}
                    </p>

                    <p className="min-w-9 text-center px-3 py-1 border rounded-lg bg-gray-50 text-sm">
                      {item.size}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-3">
                    <p className="text-sm text-gray-500">Quantity</p>

                    <div className="flex items-center border rounded-lg overflow-hidden text-sm">
                      <button
                        onClick={() =>
                          item.quantity > 1 &&
                          updateQuantity(item._id, item.size, item.quantity - 1)
                        }
                        className="w-8 h-8 flex items-center justify-center hover:bg-gray-100"
                      >
                        −
                      </button>

                      <span className="w-9 text-center font-medium">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          updateQuantity(item._id, item.size, item.quantity + 1)
                        }
                        className="w-8 h-8 flex items-center justify-center hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-end mt-12 mb-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />

          <button
            onClick={() => navigate("/place-order")}
            className="w-full bg-black rounded-xl text-white text-sm mt-8 px-8 py-4 font-medium active:scale-95 transition"
          >
            PROCEED TO CHECKOUT.
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
