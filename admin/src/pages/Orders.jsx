import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");

  const fetchAllOrders = async () => {
    if (!token) return;

    try {
      const response = await axios.post(
        `${backendUrl}/api/order/list`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  const filteredOrders = orders.filter((order) =>
    `${order.address.firstName} ${order.address.lastName}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  // KPI
  const totalOrders = orders.length;
  const paidOrders = orders.filter((o) => o.payment).length;
  const pendingOrders = orders.filter((o) => !o.payment).length;
  const totalRevenue = orders.reduce((acc, o) => acc + (o.amount || 0), 0);

  return (
    <div className="w-full p-6 bg-[#f6f7fb] min-h-screen">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Orders Dashboard</h2>
          <p className="text-gray-500">
            Track orders, payments, and delivery status
          </p>
        </div>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search customer..."
          className="w-full md:w-80 px-4 py-2 rounded-xl border bg-white shadow-sm outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <KpiCard
          title="Total Orders"
          value={totalOrders}
          color="text-gray-800"
        />
        <KpiCard
          title="Paid Orders"
          value={paidOrders}
          color="text-green-600"
        />
        <KpiCard
          title="Pending Orders"
          value={pendingOrders}
          color="text-yellow-600"
        />
        <KpiCard
          title="Revenue"
          value={`${currency}${totalRevenue}`}
          color="text-blue-600"
        />
      </div>

      {/* TABLE CARD */}
      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        <div className="p-5 border-b flex justify-between items-center">
          <h3 className="font-semibold text-gray-700">Recent Orders</h3>
          <span className="text-sm text-gray-400">
            {filteredOrders.length} results
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="text-left p-4">Customer</th>
                <th className="text-left p-4">Items</th>
                <th className="text-left p-4">Payment</th>
                <th className="text-left p-4">Date</th>
                <th className="text-left p-4">Amount</th>
                <th className="text-left p-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredOrders.map((order) => (
                <tr
                  key={order._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  {/* CUSTOMER */}
                  <td className="p-4">
                    <p className="font-medium text-gray-800">
                      {order.address.firstName} {order.address.lastName}
                    </p>
                    <p className="text-xs text-gray-400">
                      {order.address.phone}
                    </p>
                  </td>

                  {/* ITEMS */}
                  <td className="p-4">
                    {order.items.slice(0, 2).map((item, i) => (
                      <p key={i} className="text-xs text-gray-600">
                        {item.name} × {item.quantity}
                      </p>
                    ))}
                    {order.items.length > 2 && (
                      <p className="text-xs text-gray-400">
                        +{order.items.length - 2} more
                      </p>
                    )}
                  </td>

                  {/* PAYMENT */}
                  <td className="p-4">
                    <span className="text-xs font-medium">
                      {order.paymentMethod}
                    </span>
                    <div className="mt-1">
                      <Badge type={order.payment ? "paid" : "pending"}>
                        {order.payment ? "Paid" : "Pending"}
                      </Badge>
                    </div>
                  </td>

                  {/* DATE */}
                  <td className="p-4 text-gray-500">
                    {new Date(order.date).toLocaleDateString()}
                  </td>

                  {/* AMOUNT */}
                  <td className="p-4 font-semibold text-gray-800">
                    {currency}
                    {order.amount}
                  </td>

                  {/* STATUS */}
                  <td className="p-4">
                    <select
                      defaultValue={order.status || "Order Placed"}
                      className="text-xs px-3 py-2 border rounded-lg bg-white"
                    >
                      <option>Order Placed</option>
                      <option>Packing</option>
                      <option>Shipped</option>
                      <option>Out for Delivery</option>
                      <option>Delivered</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredOrders.length === 0 && (
            <div className="text-center py-16">
              <img
                src={assets.parcel_icon}
                className="w-14 mx-auto opacity-40 mb-3"
              />
              <p className="text-gray-500">No orders found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* ---------------- KPI CARD ---------------- */
const KpiCard = ({ title, value, color }) => (
  <div className="bg-white rounded-2xl border shadow-sm p-5">
    <p className="text-sm text-gray-500">{title}</p>
    <h3 className={`text-2xl font-bold mt-2 ${color}`}>{value}</h3>
  </div>
);

/* ---------------- BADGE ---------------- */
const Badge = ({ type, children }) => {
  const styles =
    type === "paid"
      ? "bg-green-100 text-green-700"
      : "bg-yellow-100 text-yellow-700";

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles}`}>
      {children}
    </span>
  );
};

export default Orders;
