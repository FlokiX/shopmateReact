import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage'; 
import CartPage from './pages/CartPage'; 
import { CartProvider } from './contexts/CartContext'; 
import './styles.css';
import ProductList from './components/ProductList';
function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} /> 
            <Route path="/cart" element={<CartPage />} /> 
            <Route path="/category/:categoryId" element={<ProductList />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
