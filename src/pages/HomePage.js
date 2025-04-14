import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import CategoryList from '../components/CategoryList';
import ProductCard from '../components/ProductCard';
import data from '../data/products.json';

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setCategories(data.categories);
  }, []);

  const allProducts = data.products.map(product => {
    const category = data.categories.find(c => c.id === product.categoryId);
    return {
      ...product,
      categoryName: category ? category.name : 'Неизвестная категория'
    };
  });

  const filteredProducts = allProducts.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div className="home-page">
      <Header onSearchChange={setSearchQuery} />
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
        </>
      )}
    </div>
  );
};

export default HomePage;
