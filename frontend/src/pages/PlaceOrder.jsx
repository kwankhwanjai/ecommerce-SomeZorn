import React, { useState, useContext } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const { navigate } = useContext(ShopContext);

  const inputClass =
    "w-full rounded-xl border border-[#d8c8ad] bg-white px-4 py-3 text-sm text-[#3f3325] outline-none transition placeholder:text-[#9b8b73] focus:border-[#8f6f45] focus:ring-2 focus:ring-[#d9b26f]/30";

  const paymentClass = (type) =>
    `flex min-h-[54px] cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition ${
      method === type
        ? "border-[#7a5b35] bg-[#f5eedc] shadow-[0_10px_25px_rgba(73,52,28,0.10)]"
        : "border-[#d8c8ad] bg-white hover:border-[#8f6f45]"
    }`;

  return (
    <div className="border-t border-[#e7dcc8] px-2 pt-6 sm:px-4 sm:pt-12">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        {/* Left Side */}
        <div className="rounded-[28px] border border-[#e5d8c2] bg-[#fffaf1] p-5 shadow-[0_18px_45px_rgba(73,52,28,0.08)] sm:p-8">
          <div className="mb-6">
            <p className="mb-2 text-xs uppercase tracking-[0.35em] text-[#8f6f45]">
              Checkout
            </p>
            <div className="text-xl sm:text-2xl">
              <Title text1={"DELIVERY"} text2={"INFORMATION"} />
            </div>
            <p className="mt-2 text-sm text-[#7b6a55]">
              Please fill in your delivery details carefully.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                className={inputClass}
                type="text"
                placeholder="First name"
              />
              <input
                className={inputClass}
                type="text"
                placeholder="Last name"
              />
            </div>

            <input
              className={inputClass}
              type="email"
              placeholder="Email address"
            />
            <input
              className={inputClass}
              type="text"
              placeholder="Street address"
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <input className={inputClass} type="text" placeholder="City" />
              <input
                className={inputClass}
                type="text"
                placeholder="State / Province"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <input
                className={inputClass}
                type="number"
                placeholder="Zipcode"
              />
              <input className={inputClass} type="text" placeholder="Country" />
            </div>

            <input
              className={inputClass}
              type="tel"
              placeholder="Phone number"
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="lg:sticky lg:top-6 lg:h-fit">
          <div className="rounded-[28px] border border-[#e5d8c2] bg-white p-5 shadow-[0_18px_45px_rgba(73,52,28,0.08)] sm:p-7">
            <CartTotal />

            <div className="mt-8 border-t border-[#eadfce] pt-7">
              <div className="mb-4 text-lg sm:text-xl">
                <Title text1={"PAYMENT"} text2={"METHOD"} />
              </div>

              <div className="flex flex-col gap-3">
                <div
                  onClick={() => setMethod("stripe")}
                  className={paymentClass("stripe")}
                >
                  <span
                    className={`h-4 w-4 rounded-full border ${
                      method === "stripe"
                        ? "border-[#3f3325] bg-[#3f3325]"
                        : "border-[#b9a88f]"
                    }`}
                  />
                  <img className="h-5" src={assets.stripe_logo} alt="Stripe" />
                </div>

                <div
                  onClick={() => setMethod("razorpay")}
                  className={paymentClass("razorpay")}
                >
                  <span
                    className={`h-4 w-4 rounded-full border ${
                      method === "razorpay"
                        ? "border-[#3f3325] bg-[#3f3325]"
                        : "border-[#b9a88f]"
                    }`}
                  />
                  <img
                    className="h-5"
                    src={assets.razorpay_logo}
                    alt="Razorpay"
                  />
                </div>

                <div
                  onClick={() => setMethod("cod")}
                  className={paymentClass("cod")}
                >
                  <span
                    className={`h-4 w-4 rounded-full border ${
                      method === "cod"
                        ? "border-[#3f3325] bg-[#3f3325]"
                        : "border-[#b9a88f]"
                    }`}
                  />
                  <p className="text-sm font-semibold tracking-wide text-[#4b3a28]">
                    CASH ON DELIVERY
                  </p>
                </div>
              </div>

              <button
                onClick={() => navigate("/orders")}
                className="mt-7 w-full rounded-full bg-[#3f3325] px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-[#7a5b35] active:scale-[0.98]"
              >
                Place Order
              </button>

              <p className="mt-4 text-center text-xs text-[#8b7a65]">
                Your order details will be confirmed before shipping.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
