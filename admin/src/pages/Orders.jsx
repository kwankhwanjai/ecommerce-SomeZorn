import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import DonutChart from "../components/orders/DonutChart";
import KpiCard from "../components/orders/KpiCard";
import PendingOrderCard from "../components/orders/PendingOrderCard";
import TransactionCard from "../components/orders/TransactionCard";
import OrderTable from "../components/orders/OrderTable";
import {
  Search,
  ShoppingBag,
  CreditCard,
  Clock,
  TrendingUp,
  RefreshCw,
} from "lucide-react";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const fetchAllOrders = async () => {
    if (!token) return;
    try {
      setLoading(true);
      const response = await axios.post(
        `${backendUrl}/api/order/list`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  // ✅ Map MongoDB schema → component fields
  const mappedOrders = useMemo(
    () =>
      orders.map((o) => ({
        ...o,
        id: o._id,
        customer_first_name: o.address?.firstName || "",
        customer_last_name: o.address?.lastName || "",
        customer_phone: o.address?.phone || "",
        customer_email: o.address?.email || "",
        address_line: o.address?.street || "",
        address_district: o.address?.city || "",
        address_province: o.address?.state || "",
        address_postcode: o.address?.zipcode || "",
        address_country: o.address?.country || "",
        payment_status: o.payment ? "paid" : "pending",
        payment_method: o.paymentMethod,
        order_status: o.status,
        order_date: o.date
          ? new Date(o.date).toISOString()
          : new Date().toISOString(),
        order_number: `#${o._id?.slice(-7).toUpperCase()}`,
      })),
    [orders],
  );

  const paidOrders = mappedOrders.filter((o) => o.payment_status === "paid");
  const pendingOrders = mappedOrders.filter(
    (o) => o.payment_status === "pending",
  );
  const totalRevenue = paidOrders.reduce((s, o) => s + (o.amount || 0), 0);

  const filtered = useMemo(
    () =>
      mappedOrders.filter((o) => {
        const nameMatch = `${o.customer_first_name} ${o.customer_last_name}`
          .toLowerCase()
          .includes(search.toLowerCase());
        const statusMatch =
          statusFilter === "all" || o.order_status === statusFilter;
        return nameMatch && statusMatch;
      }),
    [mappedOrders, search, statusFilter],
  );

  const latestPaid = [...paidOrders]
    .sort((a, b) => new Date(b.order_date) - new Date(a.order_date))
    .slice(0, 4);

  // ✅ Status update ใช้ API เดิม
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.post(
        `${backendUrl}/api/order/status`,
        { orderId, status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      await fetchAllOrders();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const STATUSES = [
    "all",
    "Order Placed",
    "Packing",
    "Shipped",
    "Out for Delivery",
    "Delivered",
  ];

  if (loading)
    return (
      <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-gray-800 rounded-full animate-spin" />
      </div>
    );

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
              Orders Dashboard
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Track orders, payments & delivery status
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search customer..."
                className="w-64 pl-10 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
            </div>
            <button
              onClick={fetchAllOrders}
              className="p-2.5 rounded-xl border border-gray-200 bg-white shadow-sm hover:bg-gray-50 transition"
            >
              <RefreshCw className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>

        {/* DONUT + KPIs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-10">
          <div className="lg:col-span-4 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm flex items-center gap-6">
            <DonutChart
              paid={paidOrders.length}
              pending={pendingOrders.length}
            />
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider">
                Total Revenue
              </p>
              <p className="text-3xl font-bold text-gray-800">
                {currency}
                {totalRevenue.toLocaleString()}
              </p>
              <div className="flex items-center gap-3 mt-2">
                <span className="flex items-center gap-1 text-[11px] text-emerald-600">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" /> Paid{" "}
                  {paidOrders.length}
                </span>
                <span className="flex items-center gap-1 text-[11px] text-amber-600">
                  <span className="w-2 h-2 rounded-full bg-amber-400" /> Pending{" "}
                  {pendingOrders.length}
                </span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <KpiCard
              icon={<ShoppingBag className="w-4 h-4 text-gray-600" />}
              title="Total"
              value={mappedOrders.length}
              accent="bg-gray-100"
              subtitle="all orders"
            />
            <KpiCard
              icon={<CreditCard className="w-4 h-4 text-emerald-600" />}
              title="Paid"
              value={paidOrders.length}
              accent="bg-emerald-50"
              subtitle="completed"
            />
            <KpiCard
              icon={<Clock className="w-4 h-4 text-amber-600" />}
              title="Pending"
              value={pendingOrders.length}
              accent="bg-amber-50"
              subtitle="awaiting"
            />
            <KpiCard
              icon={<TrendingUp className="w-4 h-4 text-blue-600" />}
              title="Avg."
              value={`${currency}${mappedOrders.length ? Math.round(totalRevenue / mappedOrders.length).toLocaleString() : 0}`}
              accent="bg-blue-50"
              subtitle="per order"
            />
          </div>
        </div>

        {/* PENDING */}
        {pendingOrders.length > 0 && (
          <div className="mb-10">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Waiting for payment
            </h2>
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {pendingOrders.map((o) => (
                <PendingOrderCard key={o.id} order={o} />
              ))}
            </div>
          </div>
        )}

        {/* TRANSACTIONS */}
        {latestPaid.length > 0 && (
          <div className="mb-10">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Latest transactions
            </h2>
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {latestPaid.map((o) => (
                <TransactionCard key={o.id} order={o} />
              ))}
            </div>
          </div>
        )}

        {/* STATUS TABS */}
        <div className="flex items-center gap-2 mb-5 overflow-x-auto pb-1">
          {STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                statusFilter === s
                  ? "bg-gray-900 text-white shadow-sm"
                  : "bg-white text-gray-500 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              {s === "all" ? "All" : s}
            </button>
          ))}
        </div>

        {/* TABLE */}
        <OrderTable orders={filtered} onStatusChange={handleStatusChange} />
      </div>
    </div>
  );
};

export default Orders;
