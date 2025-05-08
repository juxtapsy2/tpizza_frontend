import React, { useEffect, useState } from 'react';
import api from "../../config/api";
import { format } from 'date-fns';
import { getAllOrdersGate } from '../../routes/APIGates';
import { useAuth } from '../../contexts/AuthContext';

const ManageOrder = () => {
  const [orders, setOrders] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [usernames, setUsernames] = useState({}); // Store usernames by userId
  const { getUserById } = useAuth(); // Destructure the getUserById from the hook

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get(getAllOrdersGate, { withCredentials: true });
        setOrders(res.data);

        // Fetch usernames for each order
        const userIds = [...new Set(orders.map(order => order.userId))]; // Extract unique user IDs
        const users = {};
        for (const userId of userIds) {
          const userData = await getUserById(userId);
          if (userData) {
            users[userId] = userData.username || 'Ẩn danh';
          }
        }
        setUsernames(users); // Store the usernames in the state
      } catch (err) {
        console.error('Failed to fetch orders', err);
      }
    };

    fetchOrders();
  }, [getUserById]);

  const filteredOrders =
    filterStatus === 'all'
      ? orders
      : orders.filter((order) => order.status === filterStatus);

  const formatOrderDate = (date) => {
    const parsedDate = new Date(date);
    // Check if the date is valid
    if (isNaN(parsedDate.getTime())) {
      return 'Ngày không hợp lệ'; // You can return a custom message
    }
    return format(parsedDate, 'dd/MM/yyyy'); // Format valid date
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Quản lý đơn hàng</h1>

      <div className="mb-4">
        <label htmlFor="statusFilter" className="mr-2 font-medium">
          Lọc theo trạng thái:
        </label>
        <select
          id="statusFilter"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded"
        >
          <option value="all">Tất cả</option>
          <option value="pending">Chờ xử lý</option>
          <option value="processing">Đang giao</option>
          <option value="completed">Hoàn tất</option>
          <option value="cancelled">Đã hủy</option>
        </select>
      </div>

      <table className="min-w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Mã đơn</th>
            <th className="p-2 border">Khách hàng</th>
            <th className="p-2 border">Ngày đặt</th>
            <th className="p-2 border">Tổng tiền</th>
            <th className="p-2 border">Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center p-4">Không có đơn hàng.</td>
            </tr>
          ) : (
            filteredOrders.map((order) => (
              <tr key={order._id} className="text-center">
                <td className="p-2 border">{order._id.slice(-6).toUpperCase()}</td>
                <td className="p-2 border">{usernames[order.userId] || 'Ẩn danh'}</td> {/* Use the username from the state */}
                <td className="p-2 border">{formatOrderDate(order.date)}</td>
                <td className="p-2 border">{order.totalPrice.toLocaleString()}₫</td>
                <td className="p-2 border">{order.status}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageOrder;
