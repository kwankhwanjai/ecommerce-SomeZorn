import React, { useContext, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import RelateProducts from "../components/RelateProducts";
import { toast } from "react-toastify";

const Product = () => {
  const { productId } = useParams();
  const {
    products = [],
    currency,
    addToCart,
    navigate,
  } = useContext(ShopContext);

  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  const productData = useMemo(() => {
    return products.find((item) => item._id === productId);
  }, [products, productId]);

  const productImages = useMemo(() => {
    const images = productData?.imageUrl || productData?.image || [];
    return Array.isArray(images) ? images : [images];
  }, [productData]);

  useEffect(() => {
    setImage(productImages[0] || "");
    setSize("");
  }, [productImages, productId]);

  const handleAddToCart = () => {
    if (!productData) return;

    if (productData.sizes?.length > 0 && !size) {
      toast.error("Please select a size");
      return;
    }

    addToCart(productData._id, size);
  };

  if (products.length === 0) {
    return (
      <main className="border-t border-gray-200 py-20 text-center">
        <p className="text-sm text-gray-500">Loading product...</p>
      </main>
    );
  }

  if (!productData) {
    return (
      <main className="border-t border-gray-200 px-4 py-20 text-center">
        <p className="text-sm font-medium text-gray-900">Product not found</p>
        <button
          type="button"
          onClick={() => navigate("/collection")}
          className="mt-5 rounded-full bg-gray-900 px-6 py-3 text-sm text-white transition hover:bg-gray-700"
        >
          Back to Collection
        </button>
      </main>
    );
  }

  return (
    <main className="border-t border-gray-200 px-3 pt-6 sm:px-4 sm:pt-10">
      <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
        {/* Images */}
        <div className="flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex gap-3 overflow-x-auto sm:w-[92px] sm:flex-col sm:overflow-visible">
            {productImages.length > 0 ? (
              productImages.map((item, index) => (
                <button
                  type="button"
                  key={index}
                  onClick={() => setImage(item)}
                  className={`aspect-[4/5] w-20 shrink-0 overflow-hidden rounded-xl bg-white transition sm:w-full ${
                    image === item ? "bg-gray-50 shadow-sm" : "hover:bg-gray-50"
                  }`}
                >
                  <img
                    src={item}
                    alt={`${productData.name} ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))
            ) : (
              <div className="aspect-[4/5] w-20 shrink-0 rounded-xl bg-gray-100 sm:w-full" />
            )}
          </div>

          <div className="flex-1 overflow-hidden rounded-[28px] bg-gray-100">
            {image ? (
              <img
                src={image}
                className="h-full max-h-[720px] w-full object-cover"
                alt={productData.name}
              />
            ) : (
              <div className="flex aspect-[4/5] items-center justify-center text-sm text-gray-400">
                No image
              </div>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col justify-center">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-gray-500">
            SomeZorn Archive
          </p>

          <h1 className="max-w-xl text-2xl font-medium leading-tight text-gray-900 sm:text-3xl">
            {productData.name}
          </h1>

          <p className="mt-5 text-2xl font-semibold text-gray-900">
            {currency}
            {productData.price}
          </p>

          {productData.description && (
            <p className="mt-5 max-w-xl text-sm leading-7 text-gray-500 sm:text-base">
              {productData.description}
            </p>
          )}

          {productData.sizes?.length > 0 && (
            <div className="mt-8">
              <p className="text-sm font-medium text-gray-900">Select Size</p>

              <div className="mt-3 flex flex-wrap gap-2">
                {productData.sizes.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setSize(item)}
                    className={`min-w-12 rounded-full border px-5 py-2.5 text-sm transition ${
                      size === item
                        ? "border-gray-900 bg-gray-900 text-white"
                        : "border-gray-200 bg-white text-gray-700 hover:border-gray-900"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={handleAddToCart}
            className="mt-8 w-full rounded-full bg-gray-900 px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-gray-700 active:scale-[0.98] sm:w-fit"
          >
            Add to Cart
          </button>

          <div className="mt-8 grid gap-3 border-t border-gray-200 pt-6 text-sm text-gray-500 sm:grid-cols-3">
            <p>Curated second-hand piece</p>
            <p>Quality checked</p>
            <p>Ready to ship</p>
          </div>
        </div>
      </section>

      <RelateProducts
        category={productData.category}
        subCategory={productData.subCategory}
        currentProductId={productData._id}
      />
    </main>
  );
};

export default Product;
