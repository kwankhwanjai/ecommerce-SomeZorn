import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import ProductItem from "../components/Productitem";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);

  const [showFilter, setShowFilter] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");

  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value],
    );
  };

  const toggleSubCategory = (e) => {
    const value = e.target.value;
    setSubCategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value],
    );
  };

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category),
      );
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory),
      );
    }

    if (sortType === "low-high") {
      productsCopy.sort((a, b) => a.price - b.price);
    }

    if (sortType === "high-low") {
      productsCopy.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(productsCopy);
  };

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, products, sortType]);

  return (
    <div className="border-t pt-8 sm:pt-10 px-4 sm:px-0">
      <div className="flex flex-col sm:flex-row gap-6 sm:gap-10">
        <aside className="sm:w-56 sm:shrink-0">
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="w-full flex items-center justify-between text-base sm:text-xl font-semibold py-3"
          >
            <span>FILTERS</span>
            <span className="sm:hidden text-xl">{showFilter ? "−" : "+"}</span>
          </button>

          <div
            className={`${showFilter ? "block" : "hidden"} sm:block space-y-4`}
          >
            <div className="border border-gray-200 rounded-2xl p-4">
              <p className="mb-4 text-sm font-semibold">CATEGORIES</p>

              <div className="flex flex-col gap-3 text-sm text-gray-700">
                {["Men", "Women", "Kids"].map((item) => (
                  <label
                    key={item}
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    <input
                      className="w-4 h-4 accent-black"
                      type="checkbox"
                      value={item}
                      onChange={toggleCategory}
                    />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="border border-gray-200 rounded-2xl p-4">
              <p className="mb-4 text-sm font-semibold">TYPE</p>

              <div className="flex flex-col gap-3 text-sm text-gray-700">
                {["Topwear", "Bottomwear", "Winterwear"].map((item) => (
                  <label
                    key={item}
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    <input
                      className="w-4 h-4 accent-black"
                      type="checkbox"
                      value={item}
                      onChange={toggleSubCategory}
                    />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <main className="flex-1 min-w-0">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <div className="text-xl sm:text-2xl">
                <Title text1="ALL" text2="COLLECTIONS" />
              </div>
              <p className="mt-1 text-sm text-gray-500">
                {filteredProducts.length} items
              </p>
            </div>

            <select
              value={sortType}
              onChange={(e) => setSortType(e.target.value)}
              className="w-full sm:w-48 border border-gray-300 rounded-xl text-sm px-4 py-3 outline-none bg-white"
            >
              <option value="relevant">Sort by: Relevant</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
            </select>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="border border-gray-200 rounded-2xl py-16 text-center text-gray-500">
              No products found
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-8">
              {filteredProducts.map((item) => (
                <ProductItem
                  key={item._id}
                  name={item.name}
                  id={item._id}
                  price={item.price}
                  image={item.imageUrl || item.image}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Collection;
