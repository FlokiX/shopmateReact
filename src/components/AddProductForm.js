import React, { useState } from 'react';
import './AddProductForm.css'; // Создадим новый файл стилей

const AddProductForm = ({ categories, onAddProduct }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: '',
    categoryId: categories[0]?.id || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newProduct = {
      id: Date.now(),
      name: formData.name,
      price: Number(formData.price),
      categoryId: Number(formData.categoryId),
      image: formData.image || 'default-product.png'
    };

    
    const existingProducts = JSON.parse(localStorage.getItem('products')) || [];
    const updatedProducts = [...existingProducts, newProduct];
    localStorage.setItem('products', JSON.stringify(updatedProducts));

    onAddProduct(newProduct);
    setFormData({
      name: '',
      price: '',
      image: '',
      categoryId: categories[0]?.id || ''
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="add-product-form">
      <div className="form-header">
        <h2>Добавить новый товар</h2>
        <div className="form-divider"></div>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Название товара</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Цена ($)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              min="1"
              required
            />
          </div>

          <div className="form-group">
            <label>Категория</label>
            <select 
              name="categoryId" 
              value={formData.categoryId} 
              onChange={handleChange}
              required
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>URL изображения (опционально)</label>
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <button type="submit" className="submit-btn">
          Добавить товар
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;