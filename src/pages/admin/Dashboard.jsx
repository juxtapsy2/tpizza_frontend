import { useEffect, useState } from 'react';
import api from "../../config/api";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
} from 'recharts';
import { getSalesOverTimeGate } from '../../routes/APIGates';

const formatLabel = (item, range) => {
  if (range === 'monthly') return `${item._id.month}/${item._id.year}`;
  if (range === 'weekly') return `Week ${item._id.week} - ${item._id.year}`;
  return `${item._id.day}/${item._id.month}`;
};

const Dashboard = () => {
  const [range, setRange] = useState('daily');
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const res = await api.get(`${getSalesOverTimeGate}${range}`, {
          withCredentials: true,
        });
        const formatted = res.data.map(item => ({
          label: formatLabel(item, range),
          revenue: item.totalRevenue,
        }));
        setSalesData(formatted);
      } catch (err) {
        console.error('Error fetching sales data:', err);
      }
    };

    fetchSales();
  }, [range]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">🛒 Doanh thu theo thời gian</h2>

      <div className="mb-4">
        <select
          value={range}
          onChange={(e) => setRange(e.target.value)}
          className="border px-3 py-1 rounded"
        >
          <option value="daily">Theo ngày</option>
          <option value="weekly">Theo tuần</option>
          <option value="monthly">Theo tháng</option>
        </select>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={salesData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip formatter={(value) => `${value.toLocaleString()}₫`} />
          <Line type="monotone" dataKey="revenue" stroke="#22c55e" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Dashboard;
