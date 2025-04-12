// pages/HomePage.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryList from '../components/CategoryList'; // Импортируем CategoryList
import Header from '../components/Header'; // Импортируем Header
import data from '../data/products.json'; // Импортируем данные из JSON файла

const HomePage = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Загружаем категории из JSON
    setCategories(data.categories);
  }, []);

  return (
    <div className="home-page">
      <Header /> {/* Добавляем Header */}
      <h1>Категории</h1>
      <CategoryList categories={categories} />  {/* Здесь отображаем категории */}
    </div>
  );
};

export default HomePage;
