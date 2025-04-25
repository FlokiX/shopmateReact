import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import CategoryList from '../components/CategoryList';
import ProductCard from '../components/ProductCard';
import AddProductForm from '../components/AddProductForm'; 
import data from '../data/products.json';

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  useEffect(() => {
    setCategories(data.categories);
    setProducts(data.products);
    const user = localStorage.getItem('user');
    setIsLoggedIn(!!user); 
  }, []);

  const allProducts = products.map(product => {
    const category = categories.find(c => c.id === product.categoryId);
    return {
      ...product,
      categoryName: category ? category.name : 'Неизвестная категория'
    };
  });

  //фильтрует товары по строке поиска
  const filteredProducts = allProducts.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const handleAddProduct = (newProduct) => {
    setProducts(prev => [...prev, newProduct]);
  };

  return (
    <div className="home-page">
      <Header onSearchChange={setSearchQuery} 
      isLoggedIn={isLoggedIn} 
  setIsLoggedIn={setIsLoggedIn}/>
      {searchQuery ? (
        <div className="search-results">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h2>Результаты поиска по: "{searchQuery}"</h2>
            <button
              onClick={handleClearSearch}
              style={{
                background: 'transparent',
                border: 'none',
                fontSize: '1.5rem',
                cursor: 'pointer',
                color: '#555'
              }}
              title="Очистить поиск"
            >
              ✖
            </button>
          </div>
          <div className="product-grid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p>Ничего не найдено.</p>
            )}
          </div>
        </div>
      ) : (
        <>
          <h1>Категории</h1>
          <CategoryList categories={categories} />

          {/* Добавляем только если авторизован */}
          {isLoggedIn ? (
            <AddProductForm categories={categories} onAddProduct={handleAddProduct} />
          ) : (
            <p style={{ marginTop: '2rem', color: '#999' }}>
              🔒 Добавление товара доступно только авторизованным пользователям.
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default HomePage;
