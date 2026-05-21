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
    <>
      <div className="mb-5">
        <h2 className="text-xl font-semibold text-gray-800">Product List</h2>
        <p className="text-sm text-gray-500 mt-1">
          Manage all products in your store
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="hidden md:grid grid-cols-[90px_2fr_1fr_1fr_80px] items-center px-4 py-3 bg-gray-50 border-b border-gray-200 text-sm font-semibold text-gray-600">
          <p>Image</p>
          <p>Name</p>
          <p>Category</p>
          <p>Price</p>
          <p className="text-center">Action</p>
        </div>

        {list.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[80px_1fr] md:grid-cols-[90px_2fr_1fr_1fr_80px] items-center gap-3 px-4 py-3 border-b border-gray-100 text-sm text-gray-700 hover:bg-gray-50 transition"
          >
            <img
              className="w-14 h-14 object-cover rounded-lg border border-gray-200"
              src={item.imageUrl?.[0]}
              alt={item.name}
            />

            <div>
              <p className="font-medium text-gray-800">{item.name}</p>
              <p className="md:hidden text-xs text-gray-500 mt-1">
                {item.category}
              </p>
            </div>

            <p className="hidden md:block">{item.category}</p>

            <p className="font-medium">
              {currency}
              {item.price}
            </p>

            <p
              onClick={() => removeProduct(item._id)}
              className="text-center text-red-500 cursor-pointer hover:text-red-700 font-semibold"
            >
              X
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default List;
