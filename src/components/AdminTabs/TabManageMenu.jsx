import React, { useState } from 'react';
import { usePizzas } from '../../contexts/PizzaContext';
import { PIZZA_PRICES } from '../../constants';
import InfoModal from '../../components/InfoModal/InfoModal';
import AddEditPizzaModal from '../../components/AddEditPizzaModal/AddEditPizzaModal';
import api from "../../config/api";
import { toast } from 'react-toastify';
import { disablePizzaGate } from '../../routes/APIGates';

const TabManageMenu = () => {
  const { pizzas, fetchPizzas } = usePizzas();
  const [filterClass, setFilterClass] = useState('all');
  const [infoPizza, setInfoPizza] = useState(null);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [editPizza, setEditPizza] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const filteredPizzas = filterClass === 'all' ? pizzas : pizzas.filter(p => p.class.includes(filterClass));

  const openInfoModal = (pizza) => {
    setInfoPizza(pizza);
    setIsInfoOpen(true);
  };

  const closeInfoModal = () => {
    setInfoPizza(null);
    setIsInfoOpen(false);
  };

  const openEditModal = (pizza = null) => {
    setEditPizza(pizza);
    setIsEditOpen(true);
  };

  const closeEditModal = () => {
    setEditPizza(null);
    setIsEditOpen(false);
    fetchPizzas();
  };

  const deletePizza = async (pizzaId) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa pizza này không?')) return;

    try {
      await api.put(disablePizzaGate(pizzaId));
      toast.success('Đã xóa pizza thành công');
      fetchPizzas();
    } catch (err) {
      toast.error('Lỗi khi xóa pizza');
    }
  };

  const getPizzaDetails = (pizza) => [
    { label: 'Mô tả', value: pizza.description || 'Không có mô tả' },
    { label: 'Phân loại', value: pizza.class?.join(', ') },
    { label: 'Cỡ mặc định', value: `${pizza.defaultSize} inch` },
    { label: 'Đế mặc định', value: pizza.defaultCrustStyle },
    {
      label: 'Topping',
      value: pizza.toppings?.length > 0 ? pizza.toppings.map((t) => t.name).join(', ') : 'Không có',
    },
    { label: 'Trạng thái', value: pizza.status === 'enabled' ? 'Đang bán' : 'Tạm ẩn' },
    { label: 'Ngày tạo', value: new Date(pizza.createdAt).toLocaleString() },
    { label: 'Ngày cập nhật', value: new Date(pizza.updatedAt).toLocaleString() },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-green-900">Quản lý Thực đơn TPizza</h1>
        <button
          onClick={() => openEditModal(null)}
          className="bg-green-700 hover:bg-green-800 text-white text-sm px-4 py-2 rounded shadow"
        >
          + Thêm Pizza
        </button>
      </div>

      {/* Filter */}
      <div className="mb-4 flex items-center gap-2">
        <label htmlFor="classFilter" className="font-medium text-green-900">
          Lọc theo thể loại:
        </label>
        <select
          id="classFilter"
          value={filterClass}
          onChange={(e) => setFilterClass(e.target.value)}
          className="text-green-950 text-sm border border-green-300 px-4 py-2 rounded shadow-sm"
        >
          <option value="all">Tất cả</option>
          {[...new Set(pizzas.flatMap((pizza) => pizza.class))].map((className) => (
            <option key={className} value={className}>
              {className}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full text-sm text-left border">
          <thead className="bg-green-950 text-white text-center">
            <tr>
              <th className="p-3 border"></th>
              <th className="p-3 border">Tên món</th>
              <th className="p-3 border">Giá mặc định</th>
              <th className="p-3 border">Thể loại</th>
              <th className="p-3 border" colSpan={2}></th>
            </tr>
          </thead>
          <tbody>
            {filteredPizzas.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center p-6 text-gray-500">
                  Không có pizza nào.
                </td>
              </tr>
            ) : (
              filteredPizzas.map((pizza, index) => (
                <tr
                  key={pizza._id}
                  className={`text-center ${index % 2 === 0 ? 'bg-white' : 'bg-green-50'} hover:bg-primary-50 transition`}
                >
                  <td className="p-3 border">
                    <img
                      src={pizza.coverImage}
                      alt={pizza.title}
                      className="w-16 h-16 m-auto object-cover rounded border"
                    />
                  </td>
                  <td
                    className="p-3 border font-bold text-green-900 cursor-pointer hover:text-green-700"
                    onClick={() => openInfoModal(pizza)}
                  >
                    {pizza.title}
                  </td>
                  <td className="p-3 border">
                    {(PIZZA_PRICES[`${pizza.defaultSize}-${pizza.defaultCrustStyle}`] || 0).toLocaleString()}₫
                  </td>
                  <td className="p-3 border">{pizza.class?.join(', ')}</td>
                  <td className="p-3 border">
                    <button
                      onClick={() => openEditModal(pizza)}
                      className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1 rounded-md"
                    >
                      Sửa
                    </button>
                  </td>
                  <td className="p-3 border">
                    <button
                      onClick={() => deletePizza(pizza._id)}
                      className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded-md"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Info Modal */}
      {infoPizza && (
        <InfoModal
          title="Chi tiết Pizza"
          details={getPizzaDetails(infoPizza)}
          isOpen={isInfoOpen}
          onClose={closeInfoModal}
        />
      )}

      {/* Add/Edit Pizza Modal */}
      {isEditOpen && (
        <AddEditPizzaModal pizza={editPizza} isOpen={isEditOpen} onClose={closeEditModal} />
      )}
    </div>
  );
};

export default TabManageMenu;
