import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "฿";
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Please select size");
      return;
    }

    const cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    setCartItems(cartData);
  };

  const getCartCount = () => {
    let totalCount = 0;

    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        if (cartItems[itemId][size] > 0) {
          totalCount += cartItems[itemId][size];
        }
      }
    }

    return totalCount;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    const cartData = structuredClone(cartItems);

    if (!cartData[itemId]) return;

    cartData[itemId][size] = quantity;

    if (quantity <= 0) {
      delete cartData[itemId][size];

      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }
    }

    setCartItems(cartData);
  };

  const getCartAmount = () => {
    let totalAmount = 0;

    for (const productId in cartItems) {
      const itemInfo = products.find((product) => product._id === productId);

      if (!itemInfo) continue;

      for (const size in cartItems[productId]) {
        const quantity = cartItems[productId][size];

        if (quantity > 0) {
          totalAmount += itemInfo.price * quantity;
        }
      }
    }

    return totalAmount;
  };

  const getProductData = async () => {
    try {
      console.log("backendUrl:", backendUrl);

      const response = await axios.get(`${backendUrl}/api/product/list`);

      console.log("product response:", response.data);

      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("getProductData error:", error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getProductData();
  }, []);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
