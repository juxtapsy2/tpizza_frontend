import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../../config/api';
import { addNewPizzaGate, updatePizzaGate } from '../../routes/APIGates';

const AddEditPizzaModal = ({ pizza = null, isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    coverImage: '',
    detailImage: '',
    description: '',
    class: [],
    availableSizes: [7, 9, 12],
    availableCrusts: ['Thin', 'Regular', 'Thick'],
    defaultSize: 9,
    defaultCrustStyle: 'Thin',
    toppings: [],
    status: 'disabled',
  });

  useEffect(() => {
    if (pizza) {
      setFormData({
        title: pizza.title || '',
        coverImage: pizza.coverImage || '',
        detailImage: pizza.detailImage || '',
        description: pizza.description || '',
        class: pizza.class || [],
        availableSizes: pizza.availableSizes || [7, 9, 12],
        availableCrusts: pizza.availableCrusts || ['Thin', 'Regular', 'Thick'],
        defaultSize: pizza.defaultSize || 9,
        defaultCrustStyle: pizza.defaultCrustStyle || 'Thin',
        toppings: pizza.toppings || [],
        status: pizza.status || 'disabled',
      });
    }
  }, [pizza]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'class' || name === 'availableSizes' || name === 'availableCrusts') {
      setFormData({ ...formData, [name]: value.split(',') });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleToppingsChange = (e, index) => {
    const { name, value } = e.target;
    const newToppings = [...formData.toppings];
    newToppings[index][name] = value;
    setFormData({ ...formData, toppings: newToppings });
  };

  const handleAddTopping = () => {
    setFormData({
      ...formData,
      toppings: [...formData.toppings, { name: '', price: 0 }],
    });
  };

  const handleRemoveTopping = (index) => {
    const newToppings = [...formData.toppings];
    newToppings.splice(index, 1);
    setFormData({ ...formData, toppings: newToppings });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = pizza ? updatePizzaGate(pizza._id) : addNewPizzaGate;
    const method = pizza ? 'put' : 'post';
    try {
      await api[method](endpoint, formData);
      toast.success(`${pizza ? 'Cập nhật' : 'Thêm'} pizza thành công!`);
      onClose();
    } catch (err) {
      toast.error('Có lỗi xảy ra, vui lòng thử lại!');
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    isOpen && (
      <div className="fixed pt-80 inset-0 flex items-center justify-center bg-black bg-opacity-50 overflow-scroll">
        <div className="bg-white p-8 rounded-lg max-w-4xl w-full">
          <form onSubmit={handleSubmit}>
            <h2 className="text-2xl font-semibold mb-6">
              {pizza ? 'Sửa Pizza' : 'Thêm Pizza'}
            </h2>

            {/* Title */}
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Tên Pizza
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>

            {/* Cover Image */}
            <div className="mb-4">
              <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700">
                Hình ảnh bìa
              </label>
              <input
                type="text"
                name="coverImage"
                value={formData.coverImage}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>

            {/* Detail Image */}
            <div className="mb-4">
              <label htmlFor="detailImage" className="block text-sm font-medium text-gray-700">
                Hình ảnh chi tiết
              </label>
              <input
                type="text"
                name="detailImage"
                value={formData.detailImage}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>

            {/* Description */}
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Mô tả
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>

            {/* Class */}
            <div className="mb-4">
              <label htmlFor="class" className="block text-sm font-medium text-gray-700">
                Thể loại (Comma separated)
              </label>
              <input
                type="text"
                name="class"
                value={formData.class.join(',')}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>

            {/* Available Sizes */}
            <div className="mb-4">
              <label htmlFor="availableSizes" className="block text-sm font-medium text-gray-700">
                Kích thước có sẵn (Comma separated)
              </label>
              <input
                type="text"
                name="availableSizes"
                value={formData.availableSizes.join(',')}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>

            {/* Available Crusts */}
            <div className="mb-4">
              <label htmlFor="availableCrusts" className="block text-sm font-medium text-gray-700">
                Loại đế có sẵn (Comma separated)
              </label>
              <input
                type="text"
                name="availableCrusts"
                value={formData.availableCrusts.join(',')}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>

            {/* Default Size */}
            <div className="mb-4">
              <label htmlFor="defaultSize" className="block text-sm font-medium text-gray-700">
                Kích thước mặc định
              </label>
              <select
                name="defaultSize"
                value={formData.defaultSize}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              >
                {[7, 9, 12].map((size) => (
                  <option key={size} value={size}>
                    {size} inch
                  </option>
                ))}
              </select>
            </div>

            {/* Default Crust Style */}
            <div className="mb-4">
              <label htmlFor="defaultCrustStyle" className="block text-sm font-medium text-gray-700">
                Đế mặc định
              </label>
              <select
                name="defaultCrustStyle"
                value={formData.defaultCrustStyle}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              >
                {['Thin', 'Regular', 'Thick', 'Stuffed'].map((crust) => (
                  <option key={crust} value={crust}>
                    {crust}
                  </option>
                ))}
              </select>
            </div>

            {/* Toppings */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Toppings</label>
              {formData.toppings.map((topping, index) => (
                <div key={index} className="flex items-center gap-4 mb-2">
                  <input
                    type="text"
                    name="name"
                    value={topping.name}
                    onChange={(e) => handleToppingsChange(e, index)}
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Topping Name"
                  />
                  <input
                    type="number"
                    name="price"
                    value={topping.price}
                    onChange={(e) => handleToppingsChange(e, index)}
                    className="w-24 px-3 py-2 border rounded-md"
                    placeholder="Price"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveTopping(index)}
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                  >
                    Xóa
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddTopping}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md"
              >
                Thêm topping
              </button>
            </div>

            {/* Status */}
            <div className="mb-4">
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                Trạng thái
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="enabled">Đang bán</option>
                <option value="disabled">Tạm ẩn</option>
              </select>
            </div>

            {/* Buttons */}
            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={handleClose}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
              >
                {pizza ? 'Cập nhật' : 'Thêm'}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default AddEditPizzaModal;
