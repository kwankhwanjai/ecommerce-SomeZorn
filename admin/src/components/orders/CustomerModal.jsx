import React from "react";
import {
  X,
  MapPin,
  Phone,
  Mail,
  Package,
  Calendar,
  CreditCard,
  Hash,
} from "lucide-react";
import moment from "moment";

export default function CustomerModal({ order, onClose }) {
  if (!order) return null;

  const fullName = `${order.customer_first_name} ${order.customer_last_name}`;
  const initials = `${order.customer_first_name?.[0] || ""}${order.customer_last_name?.[0] || ""}`;

  const addressParts = [
    order.address_line,
    order.address_subdistrict,
    order.address_district,
    order.address_province,
    order.address_postcode,
    order.address_country,
  ].filter(Boolean);

  const hasAddress = addressParts.length > 0;

  const statusColors = {
    "Order Placed": "bg-gray-100 text-gray-600",
    Packing: "bg-amber-50 text-amber-700",
    Shipped: "bg-blue-50 text-blue-700",
    "Out for Delivery": "bg-purple-50 text-purple-700",
    Delivered: "bg-emerald-50 text-emerald-700",
  };

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header strip */}
        <div className="bg-[#faf8f5] px-6 pt-6 pb-8 border-b border-gray-100 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white border border-gray-200 hover:bg-gray-50 transition"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>

          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="w-14 h-14 rounded-2xl bg-gray-900 flex items-center justify-center text-white text-lg font-bold shadow-md">
              {initials}
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{fullName}</h2>
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-gray-400 mt-0.5">
                <Hash className="w-3 h-3" />
                {order.order_number || order.id?.slice(-8)}
              </span>
            </div>
          </div>

          {/* Order status badge */}
          <div className="flex items-center gap-2 mt-4">
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[order.order_status] || "bg-gray-100 text-gray-600"}`}
            >
              {order.order_status || "Order Placed"}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${order.payment_status === "paid" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}
            >
              {order.payment_status === "paid" ? "Paid" : "Pending"}
            </span>
          </div>
        </div>

        <div className="px-6 py-5 flex flex-col gap-5">
          {/* Contact info */}
          <div className="flex flex-col gap-3">
            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest">
              Contact
            </p>
            {order.customer_phone && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center">
                  <Phone className="w-4 h-4 text-gray-500" />
                </div>
                <span className="text-sm text-gray-700">
                  {order.customer_phone}
                </span>
              </div>
            )}
            {order.customer_email && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center">
                  <Mail className="w-4 h-4 text-gray-500" />
                </div>
                <span className="text-sm text-gray-700">
                  {order.customer_email}
                </span>
              </div>
            )}
          </div>

          {/* Shipping address */}
          <div className="flex flex-col gap-3">
            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest">
              Shipping Address
            </p>
            {hasAddress ? (
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-amber-600" />
                </div>
                <div className="text-sm text-gray-700 leading-relaxed">
                  {order.address_line && <p>{order.address_line}</p>}
                  {(order.address_subdistrict || order.address_district) && (
                    <p>
                      {[order.address_subdistrict, order.address_district]
                        .filter(Boolean)
                        .join(", ")}
                    </p>
                  )}
                  {(order.address_province || order.address_postcode) && (
                    <p>
                      {[order.address_province, order.address_postcode]
                        .filter(Boolean)
                        .join(" ")}
                    </p>
                  )}
                  {order.address_country && (
                    <p className="text-gray-400">{order.address_country}</p>
                  )}
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-300 italic">No address on file</p>
            )}
          </div>

          {/* Order summary */}
          <div className="flex flex-col gap-3">
            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest">
              Order Summary
            </p>
            <div className="bg-gray-50 rounded-2xl p-4 flex flex-col gap-2">
              {order.items?.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex items-center gap-2">
                    <Package className="w-3.5 h-3.5 text-gray-400" />
                    <span className="text-gray-700">{item.name}</span>
                    <span className="text-gray-400">× {item.quantity}</span>
                  </div>
                  {item.price && (
                    <span className="text-gray-600 font-medium">
                      ฿{(item.price * item.quantity).toLocaleString()}
                    </span>
                  )}
                </div>
              ))}
              <div className="border-t border-gray-200 pt-2 mt-1 flex justify-between items-center">
                <span className="text-sm font-semibold text-gray-700">
                  Total
                </span>
                <span className="text-base font-bold text-gray-900">
                  ฿{order.amount?.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Footer meta */}
          <div className="flex items-center justify-between text-xs text-gray-400 pt-1 pb-1 border-t border-gray-50">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {order.order_date
                ? moment(order.order_date).format("DD MMM YYYY, HH:mm")
                : "—"}
            </div>
            <div className="flex items-center gap-1.5">
              <CreditCard className="w-3.5 h-3.5" />
              {order.payment_method || "—"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
