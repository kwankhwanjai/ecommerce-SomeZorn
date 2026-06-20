import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) return;

    try {
      const response = await axios.post(
        `${backendUrl}/api/order/list`,
        {},
        {
          headers: { token },
        },
      );

      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div>
      <h3>Order Page.</h3>

      <div>
        {orders?.map((order) => (
          <div key={order._id}>
            <img src={assets.parcel_icon} alt="parcel" />

            <div>
              {order.items?.map((item) => (
                <p key={`${item._id}-${item.size}`}>
                  {item.name} x {item.quantity}
                  <span> {item.size}</span>
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
