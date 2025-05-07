import React, { useEffect, useState } from "react";
import api from "../../config/api";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import { cancelOrderGate, getOrdersByUserGate } from "../../routes/APIGates";
import { Loader2, CalendarDays, CreditCard, ShoppingCart } from "lucide-react";
import { ORDER_STATUS_VN, PAYMENT_METHOD } from "../../constants";

export const TabTransaction = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await api.get(`${getOrdersByUserGate}/${user?._id}`);
      setOrders(res.data.orders || []);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
      toast.error("Không thể tải đơn hàng.");
    } finally {
      setLoading(false);
    }
  };

  const cancelOrder = async (orderId) => {
    if (!window.confirm("Bạn có chắc muốn huỷ đơn hàng này?")) return;
    try {
      await api.patch(`${cancelOrderGate}/${orderId}`);
      toast.success("Đơn hàng đã được huỷ.");
      fetchOrders();
    } catch (err) {
      console.error("Cancel failed:", err);
      toast.error("Huỷ đơn hàng thất bại.");
    }
  };

  useEffect(() => {
    if (user?._id) fetchOrders();
  }, [user]);

  if (loading)
    return (
      <div className="flex justify-center items-center mt-10 text-gray-500">
        <Loader2 className="animate-spin mr-2" />
        Đang tải đơn hàng...
      </div>
    );

  if (orders.length === 0)
    return (
      <p className="text-center mt-10 text-gray-500">
        Bạn chưa có đơn hàng nào.
      </p>
    );

  const renderStatusBadge = (status) => {
    const colorMap = {
      processing: "bg-blue-100 text-blue-800",
      cooking: "bg-orange-100 text-orange-800",
      ongoing: "bg-yellow-100 text-yellow-800",
      accomplished: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    };
    return (
      <span
        className={`text-xs px-3 py-1 rounded-full shadow-sm font-semibold ${colorMap[status] || "bg-gray-100 text-gray-800"}`}
      >
        {ORDER_STATUS_VN[status]}
      </span>
    );
  };

  return (
    <div className="p-4 space-y-6">
      {orders.map((order) => (
        <div
          key={order._id}
          className="p-5 border rounded-2xl shadow-md bg-white hover:shadow-lg transition-all duration-300"
        >
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-bold text-xl text-green-700 mb-1">
                Đơn hàng #{order.orderCode}
              </h3>
              <div className="flex items-center text-sm text-gray-500 gap-2">
                <CalendarDays size={14} />
                <span>{new Date(order.date).toLocaleDateString()}</span>
              </div>
            </div>
            {renderStatusBadge(order.status)}
          </div>

          {/* Info Fields */}
          <div className="space-y-3">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 flex items-center gap-2 drop-shadow-sm">
              <CreditCard size={16} className="text-green-600" />
              <span className="font-medium text-gray-700">Phương thức:</span>
              <span className="text-green-950">{PAYMENT_METHOD[order.paymentMethod]}</span>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 flex items-center gap-2 drop-shadow-sm">
              <ShoppingCart size={16} className="text-green-600" />
              <span className="font-medium text-gray-700">Sản phẩm:</span>
              <span className="text-green-950">
                {order.dishes.map((d) => `${d.slug} x${d.quantity}`).join(", ")}
              </span>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 flex items-center gap-2 drop-shadow-sm">
              <span className="font-medium text-gray-700">Tổng tiền:</span>
              <span className="text-green-700 font-semibold text-base">
                {order.totalPrice.toLocaleString()}đ
              </span>
            </div>
          </div>

          {/* Cancel Button */}
          {order.status === "processing" && (
            <button
              onClick={() => cancelOrder(order._id)}
              className="mt-4 px-5 py-1 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-full transition"
            >
              Huỷ đơn
            </button>
          )}
        </div>
      ))}
    </div>
  );
};