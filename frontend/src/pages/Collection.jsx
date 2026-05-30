import React, { useContext, useMemo, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products = [], search, showSearch } = useContext(ShopContext);

  const [showFilter, setShowFilter] = useState(false);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");

  const toggleValue = (value, setter) => {
    setter((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value],
    );
  };

  const clearFilters = () => {
    setCategory([]);
    setSubCategory([]);
    setSortType("relevant");
  };

  const filteredProducts = useMemo(() => {
    let productsCopy = [...products];

    if (showSearch && search?.trim()) {
      productsCopy = productsCopy.filter((item) =>
        item.name?.toLowerCase().includes(search.toLowerCase()),
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

    return productsCopy;
  }, [products, search, showSearch, category, subCategory, sortType]);

  const filterBoxClass =
    "rounded-[22px] border border-gray-200 bg-white p-5 shadow-[0_14px_35px_rgba(0,0,0,0.04)]";

  const filterOptions = [
    {
      title: "Categories",
      items: ["Men", "Women", "Kids"],
      state: category,
      setter: setCategory,
    },
    {
      title: "Type",
      items: ["Topwear", "Bottomwear", "Winterwear"],
      state: subCategory,
      setter: setSubCategory,
    },
  ];

  return (
    <section className="w-full px-3 pt-3 sm:px-4">
      <div className="rounded-[28px] bg-[#f8f8fa] px-4 py-6 sm:rounded-[32px] sm:px-6 sm:py-8 lg:px-8">
        {/* Header */}
        <div className="mb-7 flex flex-col gap-5 border-b border-gray-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-gray-500">
              SomeZorn Archive
            </p>

            <div className="text-2xl sm:text-3xl">
              <Title text1="ALL" text2="COLLECTIONS" />
            </div>

            <p className="mt-2 max-w-[520px] text-sm leading-6 text-gray-500">
              Curated secondhand pieces with minimal shapes, timeless comfort,
              and everyday vintage mood.
            </p>
          </div>

          <p className="w-fit rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-medium uppercase tracking-[0.16em] text-gray-500">
            {filteredProducts.length} Items
          </p>
        </div>

        <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
          {/* Filters */}
          <aside className="lg:w-[245px] lg:shrink-0">
            <button
              type="button"
              onClick={() => setShowFilter((prev) => !prev)}
              className="mb-4 flex w-full items-center justify-between rounded-full border border-gray-200 bg-white px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-gray-800 shadow-sm transition hover:bg-gray-50 lg:hidden"
            >
              <span>Filters</span>
              <span className="text-lg leading-none">
                {showFilter ? "−" : "+"}
              </span>
            </button>

            <div
              className={`${showFilter ? "block" : "hidden"} space-y-4 lg:block`}
            >
              {filterOptions.map((group) => (
                <div key={group.title} className={filterBoxClass}>
                  <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-900">
                    {group.title}
                  </p>

                  <div className="flex flex-col gap-3 text-sm text-gray-600">
                    {group.items.map((item) => (
                      <label
                        key={item}
                        className="flex cursor-pointer items-center justify-between rounded-full px-1 py-1 transition hover:text-gray-950"
                      >
                        <span>{item}</span>
                        <input
                          className="h-4 w-4 accent-black"
                          type="checkbox"
                          value={item}
                          checked={group.state.includes(item)}
                          onChange={() => toggleValue(item, group.setter)}
                        />
                      </label>
                    ))}
                  </div>
                </div>
              ))}

              {(category.length > 0 ||
                subCategory.length > 0 ||
                sortType !== "relevant") && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="w-full rounded-full border border-gray-300 bg-transparent px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-gray-700 transition hover:bg-white"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </aside>

          {/* Products */}
          <main className="min-w-0 flex-1">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-gray-500">
                Selected archive pieces
              </p>

              <select
                value={sortType}
                onChange={(e) => setSortType(e.target.value)}
                className="w-full rounded-full border border-gray-200 bg-white px-5 py-3 text-xs font-medium uppercase tracking-[0.12em] text-gray-700 outline-none shadow-sm transition focus:border-gray-400 sm:w-[230px]"
              >
                <option value="relevant">Sort by: Relevant</option>
                <option value="low-high">Price: Low to High</option>
                <option value="high-low">Price: High to Low</option>
              </select>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="rounded-[26px] border border-gray-200 bg-white px-6 py-20 text-center shadow-sm">
                <p className="text-sm font-medium text-gray-900">
                  No products found
                </p>
                <p className="mt-2 text-sm text-gray-500">
                  Try changing filters or search keywords.
                </p>

                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-6 rounded-full bg-gray-900 px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-gray-700"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-5 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                {filteredProducts.map((item) => (
                  <ProductItem
                    key={item._id}
                    id={item._id}
                    name={item.name}
                    price={item.price}
                    image={item.imageUrl || item.image}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </section>
  );
};

export default Collection;
