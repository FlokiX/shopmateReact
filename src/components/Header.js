import React, { useState } from 'react';
import Login from './anth/Login';
import Register from './anth/Register';
import './Header.css';

import { Link } from 'react-router-dom';
function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    handleCloseModal();
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">🍪 Магазин</div>
        
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Поиск товаров..." 
            className="search-input"
          />
          <button className="search-button">🔍</button>
        </div>

        {isLoggedIn ? (
          <div className="cart-container">
            <Link to="/cart">
            <button className="cart-button">🛒 Корзина</button>
            </Link>
          </div>
        ) : (
          <button className="login-button" onClick={handleOpenModal}>
            Войти
          </button>
        )}
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-tabs">
              <button 
                className={`tab ${activeTab === 'login' ? 'active' : ''}`}
                onClick={() => setActiveTab('login')}
              >
                Вход
              </button>
              <button 
                className={`tab ${activeTab === 'register' ? 'active' : ''}`}
                onClick={() => setActiveTab('register')}
              >
                Регистрация
              </button>
            </div>

            <div className="modal-body">
              {activeTab === 'login' ? (
                <Login onSuccess={handleLoginSuccess} />
              ) : (
                <Register onSuccess={handleCloseModal} />
              )}
            </div>

            <button className="modal-close" onClick={handleCloseModal}>
              &times;
            </button>
          </div>
        </div>
      )}

            
    </header>
  );
}

export default Header;
