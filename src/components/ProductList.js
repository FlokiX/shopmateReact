import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductCard from './ProductCard';
import productsData from '../data/products.json'; // Импортируем данные продуктов

function ProductList() {
  const { categoryId } = useParams();  // Получаем categoryId из параметров маршрута
  const navigate = useNavigate(); // Хук для навигации
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Фильтрация продуктов по выбранной категории
    const filteredProducts = productsData.products.filter(
      (product) => product.categoryId === parseInt(categoryId) // фильтрация по categoryId
    );
    setProducts(filteredProducts);  // Устанавливаем отфильтрованные продукты
  }, [categoryId]);  // Массив зависимостей, чтобы перезапускать фильтрацию при изменении categoryId

  const handleClose = () => {
    navigate('/');  // Переход на главную страницу
  };

  return (
    <div className="product-list">
      {/* Заголовок с крестиком */}
      <div className="product-header">
        <h2>Продукты</h2>
        <button className="close-button" onClick={handleClose}>×</button>
      </div>

      {products.length === 0 ? (
        <p>Нет продуктов в этой категории.</p>
      ) : (
        products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      )}
    </div>
  );
}

export default ProductList;
