import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelateProducts from "../components/RelateProducts";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);

  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  const fetchProductData = () => {
    products.forEach((item) => {
      if (item._id === productId) {
        setProductData(item);

        // รองรับทั้ง image และ imageUrl
        const productImages = item.imageUrl || item.image || [];

        setImage(productImages[0]);
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return productData ? (
    <div className="border-t-2 pt-10">
      <div className="flex gap-12 flex-col sm:flex-row">
        {/* รูปสินค้า */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:w-[18%]">
            {(productData.imageUrl || productData.image || []).map(
              (item, index) => (
                <img
                  key={index}
                  src={item}
                  onClick={() => setImage(item)}
                  className="w-[24%] sm:w-full cursor-pointer"
                  alt=""
                />
              ),
            )}
          </div>

          <div className="w-full sm:w-[80%]">
            <img src={image} className="w-full" alt="" />
          </div>
        </div>

        {/* ข้อมูลสินค้า */}
        <div className="flex-1">
          <h1 className="text-2xl font-medium">{productData.name}</h1>

          <p className="text-3xl mt-5">
            {currency}
            {productData.price}
          </p>

          <p className="mt-5 text-gray-500">{productData.description}</p>

          <div className="mt-8">
            <p>Select Size</p>

            <div className="flex gap-2 mt-2">
              {productData.sizes?.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSize(item)}
                  className={`border px-4 py-2 ${
                    size === item ? "bg-black text-white" : ""
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => addToCart(productData._id, size)}
            className="bg-black text-white px-8 py-3 mt-6"
          >
            ADD TO CART
          </button>
        </div>
      </div>

      <RelateProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  ) : (
    <div></div>
  );
};

export default Product;
