import axios from "axios";
import React, { useState } from "react";
import { assets } from "../assets/assets";
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
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
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

        setname("");
        setDescription("");
        setPrice("");
        setSizes([]);
        setBestseller(false);
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="w-full max-w-5xl space-y-6">
      <div>
        <p className="text-[10px] uppercase tracking-[0.24em] text-gray-400">
          Inventory
        </p>

        <h2 className="mt-1 text-2xl font-semibold text-gray-900">
          Add New Product
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Upload and manage your collection items.
        </p>
      </div>

      <div className="rounded-[28px] border border-gray-200/80 bg-white/70 p-5 shadow-sm backdrop-blur-xl md:p-7">
        <div>
          <p className="mb-3 text-sm font-medium text-gray-800">
            Product Images
          </p>

          <div className="flex flex-wrap gap-3">
            {[1, 2, 3, 4].map((item) => (
              <label
                key={item}
                htmlFor={`image${item}`}
                className="group flex h-24 w-24 cursor-pointer items-center justify-center overflow-hidden rounded-3xl border border-dashed border-gray-300 bg-gray-50/80 transition-all duration-300 hover:border-indigo-200 hover:bg-indigo-50/60"
              >
                <img
                  className={`object-cover transition-all duration-300 ${
                    (item === 1 && image1) ||
                    (item === 2 && image2) ||
                    (item === 3 && image3) ||
                    (item === 4 && image4)
                      ? "h-full w-full"
                      : "w-7 opacity-50 group-hover:scale-105"
                  }`}
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

        <div className="mt-8 grid gap-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_220px]">
            <div>
              <p className="mb-2 text-sm font-medium text-gray-800">
                Product Name
              </p>

              <input
                onChange={(e) => setname(e.target.value)}
                value={name}
                type="text"
                placeholder="Vintage denim jacket..."
                className="w-full rounded-2xl border border-gray-200 bg-white/70 px-4 py-3 text-sm text-gray-900 outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-indigo-200 focus:bg-white"
              />
            </div>

            <div>
              <p className="mb-2 text-sm font-medium text-gray-800">Price</p>

              <input
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                type="number"
                placeholder="00"
                className="w-full rounded-2xl border border-gray-200 bg-white/70 px-4 py-3 text-sm text-gray-900 outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-indigo-200 focus:bg-white"
              />
            </div>
          </div>

          <div>
            <p className="mb-2 text-sm font-medium text-gray-800">
              Description
            </p>

            <textarea
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              placeholder="Write product details..."
              className="h-32 w-full resize-none rounded-2xl border border-gray-200 bg-white/70 px-4 py-3 text-sm text-gray-900 outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-indigo-200 focus:bg-white"
            />
          </div>

          <div className="flex flex-wrap gap-4">
            <div>
              <p className="mb-2 text-sm font-medium text-gray-800">Category</p>

              <select
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                className="rounded-2xl border border-gray-200 bg-white/70 px-4 py-3 text-sm text-gray-900 outline-none transition-all duration-300 focus:border-indigo-200"
              >
                <option>Men</option>
                <option>Women</option>
                <option>Kids</option>
              </select>
            </div>

            <div>
              <p className="mb-2 text-sm font-medium text-gray-800">
                Sub Category
              </p>

              <select
                onChange={(e) => setSubCategory(e.target.value)}
                value={subCategory}
                className="rounded-2xl border border-gray-200 bg-white/70 px-4 py-3 text-sm text-gray-900 outline-none transition-all duration-300 focus:border-indigo-200"
              >
                <option>Topwear</option>
                <option>Bottomwear</option>
                <option>Winterwear</option>
              </select>
            </div>
          </div>

          <div>
            <p className="mb-3 text-sm font-medium text-gray-800">
              Product Size
            </p>

            <div className="flex flex-wrap gap-2">
              {["S", "M", "L", "XL", "XXL"].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() =>
                    setSizes((prev) =>
                      prev.includes(item)
                        ? prev.filter((s) => s !== item)
                        : [...prev, item],
                    )
                  }
                  className={`rounded-2xl border px-4 py-2 text-sm font-medium transition-all duration-300 ${
                    sizes.includes(item)
                      ? "border-gray-900 bg-gray-900 text-white"
                      : "border-gray-200 bg-white/70 text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <label
            htmlFor="bestseller"
            className="flex items-center gap-3 text-sm text-gray-700"
          >
            <input
              onChange={() => setBestseller((prev) => !prev)}
              checked={bestseller}
              type="checkbox"
              id="bestseller"
              className="h-4 w-4 accent-gray-900"
            />
            Add to bestseller collection
          </label>

          <div className="pt-2">
            <button
              type="submit"
              className="rounded-full bg-gray-900 px-7 py-3 text-sm font-medium tracking-wide text-white shadow-sm transition-all duration-300 hover:-translate-y-[1px] hover:bg-black hover:shadow-lg"
            >
              ADD PRODUCT
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Add;
