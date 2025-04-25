import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductCard from './ProductCard';
import productsData from '../data/products.json'; 

function ProductList() {
  const { categoryId } = useParams();  
  const navigate = useNavigate(); 
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Фильтрация продуктов по выбранной категории
    const filteredProducts = productsData.products.filter(
      (product) => product.categoryId === parseInt(categoryId) 
    );
    setProducts(filteredProducts);  
  }, [categoryId]);  

  const handleClose = () => {
    navigate('/');  
  };

  return (
    <div className="product-list">
      
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
