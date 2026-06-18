import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import axios from "axios";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const [loading, setLoading] = useState(false);

  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products = [],
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const cartCount = Object.values(cartItems).reduce((total, sizes) => {
    return (
      total +
      Object.values(sizes || {}).reduce((sum, quantity) => sum + quantity, 0)
    );
  }, 0);

  const hasCartItems = cartCount > 0 && products.length > 0;

  const inputClass =
    "w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:bg-white focus:ring-2 focus:ring-black/5 disabled:cursor-not-allowed disabled:opacity-60";

  const paymentClass = (type) =>
    `flex min-h-[54px] cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition ${
      method === type
        ? "border-gray-900 bg-gray-100 shadow-sm"
        : "border-gray-200 bg-white hover:border-gray-400"
    }`;

  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((products) => products._id === items),
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }
      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      switch (method) {
        case "cod": {
          const response = await axios.post(
            backendUrl + "/api/order/place",
            orderData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );
          console.log(response.data);
          if (response.data.success) {
            setCartItems({});
            toast.success("Order placed successfully");
            navigate("/orders");
          } else {
            toast.error(response.data.message);
          }

          break;
        }

        default:
          break;
      }
    } catch (error) {}
  };

  const validateForm = () => {
    const requiredFields = Object.entries(formData);

    for (const [key, value] of requiredFields) {
      if (!value.trim()) {
        toast.error("Please fill in all delivery information");
        return false;
      }
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.email.trim())) {
      toast.error("Please enter a valid email address");
      return false;
    }

    if (formData.phone.trim().length < 8) {
      toast.error("Please enter a valid phone number");
      return false;
    }

    if (!hasCartItems) {
      toast.error("Your cart is empty");
      return false;
    }

    return true;
  };

  const onPlaceOrder = async () => {
    if (loading) return;

    if (!validateForm()) return;

    try {
      setLoading(true);

      let orderItems = [];

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((p) => p._id === items),
            );

            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      const orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
        paymentMethod: method,
        number: formData.phone,
      };

      const response = await axios.post(
        backendUrl + "/api/order/place",
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data.success) {
        setCartItems({});
        toast.success("Order placed successfully");
        navigate("/orders");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Unable to place order");
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { name: "firstName", type: "text", placeholder: "First name" },
    { name: "lastName", type: "text", placeholder: "Last name" },
    { name: "email", type: "email", placeholder: "Email address" },
    { name: "street", type: "text", placeholder: "Street address" },
    { name: "city", type: "text", placeholder: "City" },
    { name: "state", type: "text", placeholder: "State / Province" },
    { name: "zipcode", type: "text", placeholder: "Zipcode" },
    { name: "country", type: "text", placeholder: "Country" },
    { name: "phone", type: "tel", placeholder: "Phone number" },
  ];

  return (
    <main className="border-t border-gray-200 px-3 pt-6 sm:px-4 sm:pt-10">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        {/* Delivery Info */}
        <section className="rounded-[28px] bg-[#f8f8fa] p-5 sm:p-8">
          <div className="mb-6">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-gray-500">
              Checkout
            </p>

            <div className="text-xl sm:text-2xl">
              <Title text1="DELIVERY" text2="INFORMATION" />
            </div>

            <p className="mt-2 text-sm text-gray-500">
              Please fill in your delivery details carefully before placing your
              order.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              {fields.slice(0, 2).map((field) => (
                <input
                  key={field.name}
                  {...field}
                  value={formData[field.name]}
                  onChange={onChangeHandler}
                  disabled={loading}
                  className={inputClass}
                  required
                />
              ))}
            </div>

            {fields.slice(2, 4).map((field) => (
              <input
                key={field.name}
                {...field}
                value={formData[field.name]}
                onChange={onChangeHandler}
                disabled={loading}
                className={inputClass}
                required
              />
            ))}

            <div className="grid gap-4 sm:grid-cols-2">
              {fields.slice(4, 6).map((field) => (
                <input
                  key={field.name}
                  {...field}
                  value={formData[field.name]}
                  onChange={onChangeHandler}
                  disabled={loading}
                  className={inputClass}
                  required
                />
              ))}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {fields.slice(6, 8).map((field) => (
                <input
                  key={field.name}
                  {...field}
                  value={formData[field.name]}
                  onChange={onChangeHandler}
                  disabled={loading}
                  className={inputClass}
                  required
                />
              ))}
            </div>

            <input
              {...fields[8]}
              value={formData.phone}
              onChange={onChangeHandler}
              disabled={loading}
              className={inputClass}
              required
            />
          </div>
        </section>

        {/* Order Summary */}
        <aside className="lg:sticky lg:top-6 lg:h-fit">
          <div className="rounded-[28px] border border-gray-200 bg-white p-5 shadow-[0_18px_45px_rgba(0,0,0,0.04)] sm:p-7">
            <CartTotal />

            <div className="mt-8 border-t border-gray-200 pt-7">
              <div className="mb-4 text-lg sm:text-xl">
                <Title text1="PAYMENT" text2="METHOD" />
              </div>

              <div className="flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => setMethod("stripe")}
                  className={paymentClass("stripe")}
                  disabled={loading}
                >
                  <span
                    className={`h-4 w-4 rounded-full border ${
                      method === "stripe"
                        ? "border-gray-900 bg-gray-900"
                        : "border-gray-300"
                    }`}
                  />
                  <img className="h-5" src={assets.stripe_logo} alt="Stripe" />
                </button>

                <button
                  type="button"
                  onClick={() => setMethod("razorpay")}
                  className={paymentClass("razorpay")}
                  disabled={loading}
                >
                  <span
                    className={`h-4 w-4 rounded-full border ${
                      method === "razorpay"
                        ? "border-gray-900 bg-gray-900"
                        : "border-gray-300"
                    }`}
                  />
                  <img
                    className="h-5"
                    src={assets.razorpay_logo}
                    alt="Razorpay"
                  />
                </button>

                <button
                  type="button"
                  onClick={() => setMethod("cod")}
                  className={paymentClass("cod")}
                  disabled={loading}
                >
                  <span
                    className={`h-4 w-4 rounded-full border ${
                      method === "cod"
                        ? "border-gray-900 bg-gray-900"
                        : "border-gray-300"
                    }`}
                  />
                  <p className="text-sm font-semibold tracking-wide text-gray-800">
                    CASH ON DELIVERY
                  </p>
                </button>
              </div>

              <button
                type="button"
                onClick={onPlaceOrder}
                disabled={loading || !hasCartItems}
                className="mt-7 w-full rounded-full bg-gray-900 px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-gray-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Placing Order..." : "Place Order"}
              </button>

              {!hasCartItems ? (
                <p className="mt-4 text-center text-xs text-red-500">
                  Your cart is empty. Please add items before checkout.
                </p>
              ) : (
                <p className="mt-4 text-center text-xs text-gray-500">
                  Your order details will be confirmed before shipping.
                </p>
              )}
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default PlaceOrder;
