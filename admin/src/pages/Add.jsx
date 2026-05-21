import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [name, setname] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller ? "true" : "false");
      formData.append("sizes", JSON.stringify(sizes));

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        { headers: { token } },
      );

      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  return (
    <form
      onSubmit={onSubmitHandler}
      className="w-full max-w-5xl text-[#111] space-y-5"
    >
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
              <img
                className="w-8 opacity-60"
                src={
                  item === 1 && image1
                    ? URL.createObjectURL(image1)
                    : item === 2 && image2
                      ? URL.createObjectURL(image2)
                      : item === 3 && image3
                        ? URL.createObjectURL(image3)
                        : item === 4 && image4
                          ? URL.createObjectURL(image4)
                          : assets.upload_area
                }
                alt=""
              />

              <input
                type="file"
                id={`image${item}`}
                hidden
                onChange={(e) => {
                  if (item === 1) setImage1(e.target.files[0]);
                  if (item === 2) setImage2(e.target.files[0]);
                  if (item === 3) setImage3(e.target.files[0]);
                  if (item === 4) setImage4(e.target.files[0]);
                }}
              />
            </label>
          ))}
        </div>
      </div>

      {/* Product Name + Price */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_220px] gap-4 max-w-[700px]">
        <div>
          <p className="mb-2 text-sm font-medium">Product Name</p>

          <input
            onChange={(e) => setname(e.target.value)}
            value={name}
            type="text"
            placeholder="Type here"
            className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-black transition"
          />
        </div>

        <div>
          <p className="mb-2 text-sm font-medium">Price</p>

          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
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
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          placeholder="Write content here"
          className="w-full max-w-[700px] h-24 border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none resize-none focus:border-black transition"
        />
      </div>

      {/* Category */}
      <div className="flex flex-wrap gap-4">
        <div>
          <p className="mb-2 text-sm font-medium">Category</p>

          <select
            onChange={(e) => setCategory(e.target.value)}
            className="w-full max-w-[320px] border border-gray-300 rounded-xl px-4 pr-10 py-2.5 text-sm outline-none focus:border-black transition bg-white"
          >
            <option>Men</option>
            <option>Women</option>
            <option>Kids</option>
          </select>
        </div>

        <div>
          <p className="mb-2 text-sm font-medium">Sub Category</p>

          <select
            onChange={(e) => setSubCategory(e.target.value)}
            className="w-full max-w-[320px] border border-gray-300 rounded-xl px-4 pr-10 py-2.5 text-sm outline-none focus:border-black transition bg-white"
          >
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
          {["S", "M", "L", "XL", "XXL"].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() =>
                setSizes(
                  (prev) =>
                    prev.includes(item)
                      ? prev.filter((s) => s !== item) // กดซ้ำ = เอาออก
                      : [...prev, item], // ยังไม่มี = เพิ่ม
                )
              }
              className={`px-4 py-1.5 border rounded-lg text-sm transition
          ${
            sizes.includes(item)
              ? "bg-black text-white"
              : "border-gray-300 hover:bg-black hover:text-white"
          }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Bestseller */}
      <label
        htmlFor="bestseller"
        className="flex items-center gap-2 text-sm cursor-pointer"
      >
        <input
          onChange={() => setBestseller((prev) => !prev)}
          checked={bestseller}
          type="checkbox"
          id="bestseller"
          className="accent-black"
        />
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
