import React from "react";
import moment from "moment";

export default function TransactionCard({ order }) {
  const name = `${order.customer_first_name} ${order.customer_last_name?.[0] || ""}.`;
  const timeAgo = moment(order.order_date).fromNow();

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-all duration-300 min-w-[220px] flex flex-col gap-2.5">
      <div className="flex items-center justify-between">
        <div className="text-xs text-gray-400 font-mono">
          {order.payment_method}
        </div>
        <span className="text-base font-bold text-emerald-600">
          + ฿{order.amount?.toLocaleString()}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-gray-700">
          {order.order_number}
        </span>
        <span className="text-[10px] text-gray-400">{timeAgo}</span>
      </div>
      <p className="text-[11px] text-gray-400">{name}</p>
    </div>
  );
}
