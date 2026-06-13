import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";
import { Link } from "react-router-dom";

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

  // Empty Cart State
  if (cartData.length === 0) {
    return (
      <div className="border-t pt-16 pb-24">
        <div className="max-w-md mx-auto text-center">
          <img
            src={assets.cart_icon}
            alt="Empty Cart"
            className="w-16 mx-auto opacity-40"
          />

          <h2 className="mt-6 text-2xl font-semibold text-gray-900">
            Your cart is empty
          </h2>

          <p className="mt-2 text-gray-500">
            Looks like you haven't added anything yet.
          </p>

          <button
            onClick={() => navigate("/collection")}
            className="mt-8 bg-black text-white px-6 py-3 rounded-xl text-sm font-medium hover:opacity-90 transition"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="border-t pt-10 sm:pt-14 px-4 sm:px-0">
      <div className="mb-8">
        <Title text1="Your" text2="Cart" />

        <p className="text-sm text-gray-500 mt-2">
          {cartData.length} item{cartData.length > 1 ? "s" : ""} in your cart
        </p>
      </div>

      {/* Desktop Layout */}
      <div className="lg:grid lg:grid-cols-3 lg:gap-10">
        {/* Products */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {cartData.map((item) => {
              const productData = products.find(
                (product) => product._id === item._id,
              );

              if (!productData) return null;

              const subtotal = productData.price * item.quantity;

              return (
                <div
                  key={`${item._id}-${item.size}`}
                  className="border rounded-2xl p-4 bg-white text-gray-700 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <Link
                      to={`/product/${productData._id}`}
                      className="shrink-0"
                    >
                      <img
                        className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-xl bg-gray-50"
                        src={
                          (productData.imageUrl || productData.image)?.[0] || ""
                        }
                        alt={productData.name}
                      />
                    </Link>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        {/* Product Name */}
                        <Link
                          to={`/product/${productData._id}`}
                          className="hover:text-black transition"
                        >
                          <p className="text-sm sm:text-lg font-medium leading-snug line-clamp-2">
                            {productData.name}
                          </p>
                        </Link>

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

                      {/* Subtotal */}
                      <div className="mt-2 text-sm text-gray-500">
                        {currency}
                        {productData.price} × {item.quantity} ={" "}
                        <span className="font-semibold text-gray-900">
                          {currency}
                          {subtotal}
                        </span>
                      </div>

                      <div className="mt-4 flex items-center justify-between gap-3">
                        <p className="text-sm text-gray-500">Quantity</p>

                        <div className="flex items-center border rounded-lg overflow-hidden text-sm">
                          <button
                            disabled={item.quantity <= 1}
                            onClick={() =>
                              updateQuantity(
                                item._id,
                                item.size,
                                item.quantity - 1,
                              )
                            }
                            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
                          >
                            −
                          </button>

                          <span className="w-9 text-center font-medium">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() =>
                              updateQuantity(
                                item._id,
                                item.size,
                                item.quantity + 1,
                              )
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
        </div>

        {/* Sticky Summary */}
        <div className="mt-10 lg:mt-0">
          <div className="lg:sticky lg:top-24">
            <div className="border rounded-2xl p-6 bg-white">
              <CartTotal />

              <button
                onClick={() => navigate("/place-order")}
                className="w-full bg-black rounded-xl text-white text-sm mt-8 px-8 py-4 font-medium hover:opacity-90 active:scale-95 transition"
              >
                Secure Checkout →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
