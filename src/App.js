import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Используем Routes вместо Switch
import HomePage from './pages/HomePage'; // Главная страница
import CartPage from './pages/CartPage'; // Страница корзины
import { CartProvider } from './contexts/CartContext'; // Контекст корзины
import './styles.css';
import ProductList from './components/ProductList';
function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Здесь используем element для рендеринга компонентов */}
            <Route path="/" element={<HomePage />} /> {/* Главная страница */}
            <Route path="/cart" element={<CartPage />} /> {/* Страница корзины */}
            <Route path="/category/:categoryId" element={<ProductList />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
