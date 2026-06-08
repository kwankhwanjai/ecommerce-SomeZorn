import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

//placing orders using cdd method

const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      amount,
      paymentMethod: "CDD",
      payment: false,
      date: date.now(),
    };
    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await userModel.findByUpdate(userId, { cartData: {} });
    res.json({ success: true, message: "Order Placed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//placing orders using stripe method

const placeOrderStripe = async (req, res) => {};

//placing orders using rezorzay method

const placeOrderRezorpay = async (req, res) => {};

//all order data for admin panel
const allOrders = async (req, res) => {};

//user order data for frontend
const userOrders = async (req, res) => {};

//update order status for admin status
const updateStatus = async (req, res) => {};

export {
  placeOrder,
  placeOrderStripe,
  placeOrderRezorpay,
  allOrders,
  userOrders,
  updateStatus,
};
