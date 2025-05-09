import React, { useEffect, useState } from 'react';
import api from "../../config/api";
import { format } from 'date-fns';
import { getAllOrdersGate, updateOrderStatusGate } from '../../routes/APIGates';
import { ORDER_STATUS_COLOR_MAP, ORDER_STATUS_VN } from "../../constants";
import InfoModal from '../../components/InfoModal/InfoModal';
import { toast } from 'react-toastify';

const TabManageOrder = () => {
  const [orders, setOrders] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null); // Track the selected order for the modal
  const [isModalOpen, setIsModalOpen] = useState(false); // Track modal open state

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get(getAllOrdersGate, { withCredentials: true });
        setOrders(res.data);
      } catch (err) {
        console.error('Failed to fetch orders', err);
      }
    };
    fetchOrders();
  }, []);

  const formatOrderDate = (date) => {
    const parsedDate = new Date(date);
    return isNaN(parsedDate.getTime()) ? 'Ngày không hợp lệ' : format(parsedDate, 'dd/MM/yyyy');
  };

  const filteredOrders =
    filterStatus === 'all'
      ? orders
      : orders.filter((order) => order.status === filterStatus);

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      const res = await api.put(updateOrderStatusGate(orderId), { status: newStatus }, { withCredentials: true });
      const updatedOrder = res.data;

      setOrders(prev => prev.map(order =>
        order._id === updatedOrder._id ? updatedOrder : order
      ));
    } catch (err) {
      console.error('Failed to update status', err);
      toast.error(err);
    }
  };

  const getOrderDetails = (order) => {
    const dishesList = order.dishes?.map(
      (dish) => `• ${dish.slug} × ${dish.quantity}`
    ).join("\n");
  
    return [
      { label: "Mã đơn", value: order.orderCode?.toUpperCase() || order._id.slice(-6).toUpperCase() },
      { label: "Khách hàng", value: order.userId?.username || "Ẩn danh" },
      { label: "Ngày đặt", value: formatOrderDate(order.date) },
      { label: "Số điện thoại", value: order.userId?.phone || "Chưa có" },
      { label: "Địa chỉ", value: order.userId?.address || "Chưa có" },
      ...(dishesList
        ? [
            {
              label: "Món đã đặt",
              value: (
                <pre className="text-sm whitespace-pre-wrap text-gray-800">
                  {dishesList}
                </pre>
              ),
            },
          ]
        : []),
      { label: "Tổng tiền", value: `${order.totalPrice.toLocaleString()}₫` },
      {
        label: "Thanh toán",
        value: order.paymentMethod === "momo" ? "MoMo" : "Thanh toán khi nhận hàng",
      },
      {
        label: "Trạng thái",
        value: (
          <span
            className={`px-2 py-1 rounded-md text-sm font-medium whitespace-nowrap ${ORDER_STATUS_COLOR_MAP[order.status]}`}
          >
            {ORDER_STATUS_VN[order.status] || order.status}
          </span>
        ),
      },
    ];
  };

  const openModal = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setIsModalOpen(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6 text-green-900">Quản lý đơn hàng</h1>

      {/* Filter Dropdown */}
      <div className="mb-4 flex items-center gap-2">
        <label htmlFor="statusFilter" className="font-medium text-green-900">
          Lọc theo trạng thái:
        </label>
        <select
          id="statusFilter"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="text-green-950 text-sm border border-green-300 px-4 py-2 rounded shadow-sm focus:outline-none focus:ring-green-50 focus:ring-primary-200"
        >
          <option value="all">Tất cả</option>
          <option value="processing">Chờ xử lý</option>
          <option value="cooking">Đang chuẩn bị</option>
          <option value="ongoing">Đang giao</option>
          <option value="accomplished">Hoàn tất</option>
          <option value="cancelled">Đã hủy</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full text-sm text-left border">
          <thead className="bg-green-950 text-white text-center">
            <tr>
              <th className="p-3 border">Mã đơn</th>
              <th className="p-3 border">Khách hàng</th>
              <th className="p-3 border">Ngày đặt</th>
              <th className="p-3 border text-right">Tổng tiền</th>
              <th className="p-3 border">Trạng thái</th>
            </tr>
          </thead>
            <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center p-6 text-gray-500">Không có đơn hàng.</td>
              </tr>
            ) : (
              filteredOrders.map((order, index) => (
                <tr
                  key={order._id}
                  className={`text-center ${index % 2 === 0 ? 'bg-white' : 'bg-green-50'} hover:bg-primary-50 transition`}
                >
                  <td
                    className="p-3 border font-bold text-green-900 hover:text-green-700 cursor-pointer"
                    onClick={() => openModal(order)}
                  >
                    {order._id.slice(-6).toUpperCase()}
                  </td>
                  <td className="p-3 border">{order.userId?.username || 'Ẩn danh'}</td>
                  <td className="p-3 border">{formatOrderDate(order.date)}</td>
                  <td className="p-3 border text-right text-base text-green-900 font-semibold">
                    {order.totalPrice.toLocaleString()}₫
                  </td>
                  <td className="p-3 border">
                    <select
                      value={order.status}
                      disabled={order.status === 'cancelled' || order.status === 'accomplished'}
                      onChange={(e) => handleUpdateStatus(order._id, e.target.value)}
                      className={`text-green-950 border px-2 py-1 h-fit max-w-[140px] rounded-full text-sm shadow-md focus:outline-none disabled:opacity-100 ${ORDER_STATUS_COLOR_MAP[order.status]}`}
                    >
                      {Object.keys(ORDER_STATUS_VN).map((statusKey) => (
                        <option key={statusKey} value={statusKey}>
                          {ORDER_STATUS_VN[statusKey]}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>

      {/* Info Modal */}
      {selectedOrder && (
        <InfoModal
          title="Chi tiết đơn hàng"
          details={getOrderDetails(selectedOrder)}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default TabManageOrder;