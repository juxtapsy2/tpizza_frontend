import { useEffect, useState } from 'react';
import api from "../../config/api";
import { usePizzas } from '../../contexts/PizzaContext';
import { useCart } from '../../contexts/CartContext';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts';
import { getSalesOverTimeGate, getAllUsersGate, getAllOrdersGate } from '../../routes/APIGates';
import { PIZZA_CLASSES } from '../../constants';

const formatLabel = (item, range) => {
  if (range === 'monthly') return `${item._id.month}/${item._id.year}`;
  if (range === 'weekly') return `Week ${item._id.week} - ${item._id.year}`;
  return `${item._id.day}/${item._id.month}`;
};

const Dashboard = () => {
  const [range, setRange] = useState('daily');
  const [userRegistrationData, setUserRegistrationData] = useState([]);
  const [pizzaClassStats, setPizzaClassStats] = useState([]);
  const [salesData, setSalesData] = useState([]);

  const { pizzas } = usePizzas();

  useEffect(() => {
    const fetchUserRegistrations = async () => {
      try {
        const res = await api.get(getAllUsersGate, { withCredentials: true }); // Adjust endpoint based on your API
        const users = res.data;
    
        const registrations = users.reduce((acc, user) => {
          const registrationDate = new Date(user.createdAt);
          const label = formatLabel({ _id: { day: registrationDate.getDate(), month: registrationDate.getMonth() + 1, year: registrationDate.getFullYear() } }, range);
    
          // If the date is already in the accumulator, increment the count
          if (acc[label]) {
            acc[label] += 1;
          } else {
            acc[label] = 1;
          }
    
          return acc;
        }, {});
    
        // Convert the registration data into an array
        const formattedRegistrationData = Object.entries(registrations).map(([label, registrations]) => ({
          label,
          registrations,
        }));
    
        setUserRegistrationData(formattedRegistrationData);
      } catch (err) {
        console.error('Error fetching user registration data:', err);
      }
    };    

    const COLORS = [
      '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
      '#9966FF', '#FF9F40', '#8dd1e1', '#d0ed57',
      '#ffc658', '#a4de6c', '#8884d8', '#82ca9d'
    ];
    
    const getColorForClass = (className) => {
      const hash = [...className].reduce((acc, char) => acc + char.charCodeAt(0), 0);
      return COLORS[hash % COLORS.length];
    };
    const fetchPizzaClassStats = () => {
      const classCount = {};

      pizzas.forEach((pizza) => {
        pizza.class.forEach((className) => {
          const trimmed = className.trim().toLowerCase();
          classCount[trimmed] = (classCount[trimmed] || 0) + 1;
        });
      });

      const stats = Object.entries(classCount).map(([className, count]) => ({
        name: PIZZA_CLASSES[className] || className, // fallback if not found
        value: count,
        color: getColorForClass(className),
      }));

      setPizzaClassStats(stats);
    };

    const fetchSalesData = async () => {
      try {
        const res = await api.get(`${getSalesOverTimeGate}${range}`, { withCredentials: true });
        const formatted = res.data.map(item => ({
          label: formatLabel(item, range),
          revenue: item.totalRevenue,
        }));
        setSalesData(formatted);
      } catch (err) {
        console.error('Error fetching sales data:', err);
      }
    };

    fetchUserRegistrations();
    fetchPizzaClassStats();
    fetchSalesData();
  }, [range, pizzas]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Thống kê</h2>
      {/* Sales Data Chart */}
      <div className="mb-6">
        <div className="flex items-center justify-end mb-2">
          <label htmlFor="range" className="mr-2 font-semibold">Khoảng thời gian:</label>
          <select
            id="range"
            value={range}
            onChange={(e) => setRange(e.target.value)}
            className="border rounded-md px-2 py-1 text-sm"
          >
            <option value="daily">Theo ngày</option>
            <option value="weekly">Theo tuần</option>
            <option value="monthly">Theo tháng</option>
          </select>
        </div>
        <h3 className="text-lg font-semibold mb-8">💰 Doanh thu theo thời gian</h3>
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
      {/* User Registrations Chart */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-8">📅 Người dùng đăng ký theo thời gian</h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={userRegistrationData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip formatter={(value) => `${value} người`} />
            <Line type="monotone" dataKey="registrations" stroke="#3498db" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Pizza Class Statistics Chart */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-8">🍕 Thống kê thể loại Pizza</h3>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={pizzaClassStats}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={150}
              label
            >
              {pizzaClassStats.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;