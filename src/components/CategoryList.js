import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CategoryList.css';

const CategoryList = ({ categories }) => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId) => {
    navigate(`/category/${categoryId}`);  // Переход к списку товаров выбранной категории
  };

  return (
    <div className="category-list">
      {categories.map((category) => (
        <div
          key={category.id}
          className="category-card"
          onClick={() => handleCategoryClick(category.id)} // Передаем id категории
        >
          <div className="category-image-container">
            <img 
              src={process.env.PUBLIC_URL + `/images/${category.image}`} 
              alt={category.name} 
              className="category-image"
            />
          </div>
          <h3 className="category-name">{category.name}</h3>
        </div>
      ))}
    </div>
  );
};

export default CategoryList;
