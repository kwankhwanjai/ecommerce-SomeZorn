import React from "react";
import { Clock, CreditCard } from "lucide-react";
import moment from "moment";

export default function PendingOrderCard({ order }) {
  const name = `${order.customer_first_name} ${order.customer_last_name}`;
  const timeAgo = moment(order.order_date).fromNow();
  const itemSummary = order.items?.map((i) => i.name).join(", ") || "—";

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col gap-3 min-w-[260px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-amber-50 flex items-center justify-center">
            <span className="text-sm font-bold text-amber-600">
              {order.customer_first_name?.[0]}
            </span>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800 leading-tight">
              {name}
            </p>
            <p className="text-[11px] text-gray-400 truncate max-w-[140px]">
              {itemSummary}
            </p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1 text-[10px] font-medium text-gray-400 bg-gray-50 px-2 py-1 rounded-full">
          <Clock className="w-3 h-3" />
          {timeAgo}
        </span>
      </div>

      <div className="flex items-center justify-between mt-1">
        <span className="text-lg font-bold text-gray-800">
          ฿{order.amount?.toLocaleString()}
        </span>
        <button className="inline-flex items-center gap-1.5 text-xs font-medium bg-gray-900 text-white px-3.5 py-1.5 rounded-full hover:bg-gray-700 transition-colors">
          <CreditCard className="w-3.5 h-3.5" />
          Request payment
        </button>
      </div>
    </div>
  );
}
