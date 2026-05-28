import axios from "axios";
import React, { useEffect, useState } from "react";
import { currency } from "../App";
import { toast } from "react-toastify";

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");

      if (response.data.success) {
        setList(response.data.products);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/product/remove",
        { id },
        { headers: { token } },
      );

      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <section className="w-full">
      <div className="mb-6">
        <p className="text-[10px] uppercase tracking-[0.24em] text-gray-400">
          Inventory
        </p>
        <h2 className="mt-1 text-2xl font-semibold text-gray-900">
          Product List
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Manage all products in your store.
        </p>
      </div>

      <div className="overflow-hidden rounded-[28px] border border-gray-200/80 bg-white/70 shadow-sm backdrop-blur-xl">
        <div className="hidden grid-cols-[90px_2fr_1fr_1fr_90px] items-center border-b border-gray-200/80 bg-gray-50/80 px-5 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-gray-500 md:grid">
          <p>Image</p>
          <p>Name</p>
          <p>Category</p>
          <p>Price</p>
          <p className="text-center">Action</p>
        </div>

        {list.length === 0 ? (
          <div className="flex min-h-[220px] flex-col items-center justify-center px-6 py-10 text-center">
            <p className="text-base font-medium text-gray-800">
              No products found
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Add your first item to start your collection.
            </p>
          </div>
        ) : (
          list.map((item, index) => (
            <div
              key={item._id || index}
              className="grid grid-cols-[72px_1fr_auto] items-center gap-3 border-b border-gray-100 px-4 py-4 text-sm text-gray-600 transition-all duration-300 last:border-b-0 hover:bg-gray-50/80 md:grid-cols-[90px_2fr_1fr_1fr_90px] md:px-5"
            >
              <img
                className="h-14 w-14 rounded-2xl border border-gray-200 object-cover"
                src={item.imageUrl?.[0]}
                alt={item.name}
              />

              <div className="min-w-0">
                <p className="truncate font-medium text-gray-900">
                  {item.name}
                </p>
                <p className="mt-1 text-xs text-gray-500 md:hidden">
                  {item.category} · {currency}
                  {item.price}
                </p>
              </div>

              <p className="hidden text-gray-500 md:block">{item.category}</p>

              <p className="hidden font-medium text-gray-900 md:block">
                {currency}
                {item.price}
              </p>

              <button
                type="button"
                onClick={() => removeProduct(item._id)}
                className="rounded-full border border-rose-100 bg-rose-50/80 px-3 py-1.5 text-xs font-semibold text-rose-500 transition-all duration-300 hover:bg-rose-100 hover:text-rose-700"
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default List;
