import React from "react";
import { assets } from "../assets/assets";

const Add = () => {
  return (
    <form className="w-full max-w-5xl text-[#111] space-y-5">
      <div>
        <h2 className="text-xl font-semibold">Add Product</h2>

        <p className="text-sm text-gray-400">Manage your product information</p>
      </div>

      {/* Upload Images */}
      <div>
        <p className="mb-2 text-sm font-medium">Upload Images</p>

        <div className="flex gap-2">
          {[1, 2, 3, 4].map((item) => (
            <label
              key={item}
              htmlFor={`image${item}`}
              className="w-20 h-20 border border-gray-300 rounded-xl flex items-center justify-center cursor-pointer hover:bg-gray-50 transition"
            >
              <img className="w-8 opacity-60" src={assets.upload_area} alt="" />

              <input type="file" id={`image${item}`} hidden />
            </label>
          ))}
        </div>
      </div>

      {/* Product Name + Price */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_220px] gap-4 max-w-[700px]">
        <div>
          <p className="mb-2 text-sm font-medium">Product Name</p>

          <input
            type="text"
            placeholder="Type here"
            className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-black transition"
          />
        </div>

        <div>
          <p className="mb-2 text-sm font-medium">Price</p>

          <input
            type="number"
            placeholder="00"
            className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-black transition"
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <p className="mb-2 text-sm font-medium">Description</p>

        <textarea
          placeholder="Write content here"
          className="w-full max-w-[700px] h-24 border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none resize-none focus:border-black transition"
        />
      </div>

      {/* Category */}
      <div className="flex flex-wrap gap-4">
        <div>
          <p className="mb-2 text-sm font-medium">Category</p>

          <select className="w-full max-w-[320px] border border-gray-300 rounded-xl px-4 pr-10 py-2.5 text-sm outline-none focus:border-black transition bg-white">
            <option>Men</option>
            <option>Women</option>
            <option>Kids</option>
          </select>
        </div>

        <div>
          <p className="mb-2 text-sm font-medium">Sub Category</p>

          <select className="w-full max-w-[320px] border border-gray-300 rounded-xl px-4 pr-10 py-2.5 text-sm outline-none focus:border-black transition bg-white">
            <option>Topwear</option>
            <option>Bottomwear</option>
            <option>Winterwear</option>
          </select>
        </div>
      </div>

      {/* Sizes */}
      <div>
        <p className="mb-2 text-sm font-medium">Product Size</p>

        <div className="flex gap-2 flex-wrap">
          {["S", "M", "L", "XL", "XXL"].map((size) => (
            <button
              key={size}
              type="button"
              className="px-4 py-1.5 border border-gray-300 rounded-lg text-sm hover:bg-black hover:text-white transition"
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Bestseller */}
      <label
        htmlFor="bestseller"
        className="flex items-center gap-2 text-sm cursor-pointer"
      >
        <input type="checkbox" id="bestseller" className="accent-black" />
        Add to bestseller
      </label>

      {/* Submit */}
      <button
        type="submit"
        className="bg-black text-white px-8 py-2.5 rounded-xl text-sm hover:opacity-90 transition"
      >
        ADD PRODUCT
      </button>
    </form>
  );
};

export default Add;
