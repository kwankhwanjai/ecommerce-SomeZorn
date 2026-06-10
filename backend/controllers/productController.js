import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

/**
 * helper: safe JSON parse
 */
const safeJsonParse = (value, fallback = []) => {
  try {
    return JSON.parse(value || "[]");
  } catch {
    return fallback;
  }
};

/**
 * ADD PRODUCT
 */
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;

    // 🔴 basic validation (important in real project)
    if (!name || !price || !category) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields (name, price, category)",
      });
    }

    // 📦 handle images safely
    const files = req.files || {};

    const images = ["image1", "image2", "image3", "image4"]
      .map((key) => files[key]?.[0])
      .filter(Boolean);

    const imagesUrl = await Promise.all(
      images.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path, {
          resource_type: "image",
        });
        return result.secure_url;
      }),
    );

    // 🧠 build product
    const productData = {
      name: name.trim(),
      description: description?.trim() || "",
      category,
      subCategory: subCategory || "",
      price: Number(price) || 0,
      bestseller: String(bestseller) === "true",
      sizes: safeJsonParse(sizes, []),
      imageUrl: imagesUrl,
      date: Date.now(),
    };

    const product = await productModel.create(productData);

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.error("ADD_PRODUCT_ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/**
 * LIST PRODUCTS
 */
const listProduct = async (req, res) => {
  try {
    const products = await productModel.find({}).sort({ date: -1 });

    return res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.error("LIST_PRODUCT_ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch products",
    });
  }
};

/**
 * REMOVE PRODUCT
 */
const removeProduct = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Product id is required",
      });
    }

    const deleted = await productModel.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product removed successfully",
    });
  } catch (error) {
    console.error("REMOVE_PRODUCT_ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/**
 * SINGLE PRODUCT
 */
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "productId is required",
      });
    }

    const product = await productModel.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error("SINGLE_PRODUCT_ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export { addProduct, listProduct, removeProduct, singleProduct };
