import React, { useState } from "react";
import { Package, ChevronDown } from "lucide-react";
import { toast } from "react-toastify";
import CustomerModal from "./CustomerModal";

const STATUS_OPTIONS = [
  "Order Placed",
  "Packing",
  "Shipped",
  "Out for Delivery",
  "Delivered",
];

const statusColors = {
  "Order Placed": "bg-gray-100 text-gray-600",
  Packing: "bg-amber-50 text-amber-700",
  Shipped: "bg-blue-50 text-blue-700",
  "Out for Delivery": "bg-purple-50 text-purple-700",
  Delivered: "bg-emerald-50 text-emerald-700",
};

export default function OrderTable({ orders, onStatusChange }) {
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await onStatusChange(orderId, newStatus);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
        <h3 className="font-semibold text-gray-800">All Orders</h3>
        <span className="text-xs text-gray-400 bg-gray-50 px-2.5 py-1 rounded-full">
          {orders.length} results
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50/60">
              {["Customer", "Items", "Payment", "Date", "Amount", "Status"].map(
                (h) => (
                  <th
                    key={h}
                    className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider"
                  >
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {orders.map((order) => (
              <tr
                key={order.id}
                className="hover:bg-amber-50/30 transition-colors"
              >
                <td className="px-6 py-4">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="flex items-center gap-3 group text-left"
                  >
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500 group-hover:bg-gray-900 group-hover:text-white transition-colors">
                      {order.customer_first_name?.[0]}
                      {order.customer_last_name?.[0]}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 text-sm underline underline-offset-2 decoration-dashed decoration-gray-300">
                        {order.customer_first_name} {order.customer_last_name}
                      </p>
                      <p className="text-[11px] text-gray-400">
                        {order.customer_phone}
                      </p>
                    </div>
                  </button>
                </td>
                <td className="px-6 py-4">
                  {order.items?.slice(0, 2).map((item, i) => (
                    <p key={i} className="text-xs text-gray-500">
                      {item.name} × {item.quantity}
                    </p>
                  ))}
                  {order.items?.length > 2 && (
                    <p className="text-[11px] text-gray-300">
                      +{order.items.length - 2} more
                    </p>
                  )}
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs text-gray-500 block mb-1">
                    {order.payment_method}
                  </span>
                  <span
                    className={`inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-medium ${order.payment_status === "paid" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}
                  >
                    {order.payment_status === "paid" ? "Paid" : "Pending"}
                  </span>
                </td>
                <td className="px-6 py-4 text-xs text-gray-400">
                  {new Date(order.order_date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 font-semibold text-gray-800">
                  ฿{order.amount?.toLocaleString()}
                </td>
                <td className="px-6 py-4">
                  <div className="relative">
                    <select
                      value={order.order_status || "Order Placed"}
                      onChange={(e) =>
                        handleStatusChange(order.id, e.target.value)
                      }
                      className={`appearance-none text-xs font-medium px-3 py-1.5 pr-7 rounded-full border-0 cursor-pointer ${statusColors[order.order_status] || statusColors["Order Placed"]}`}
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-3 h-3 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {orders.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <Package className="w-12 h-12 text-gray-200 mb-3" />
            <p className="text-sm text-gray-400">No orders found</p>
          </div>
        )}
      </div>

      {selectedOrder && (
        <CustomerModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
}
